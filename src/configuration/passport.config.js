import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import SessionManager from '../controllers/session/sessionManager.js';
import UserManager from '../controllers/user/userController.js';
import { BadRequest } from '../utils/error.js';
import { createHash } from '../utils/bcrypt.js';
import User from '../dao/models/user.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField:'email' }, async (req, username, password, done) => {
      const { firstName, lastName, email, age } = req.body;
      try {
        const user = await UserManager.getUser(username);
        if (user) {
          console.log('El usuario ya existe');
          return done (null, false);
        }
        const newUser = await UserManager.create({ firstName, lastName, email, age, password });
        return done(null, newUser);
      } catch (error) {
        return done(`Error al obtener el usuario message: ${error.message} stoack: ${error.stack}`);
      }
    }
  ));

  passport.use('github', new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/authSession/githubSession',
    passReqToCallback: true
  }, async (req, accessToken, refreshToken, profile, done) => {

    try {
      const user = await UserManager.getUser(profile._json.id);
      if (user) return done(null, user);
      const userCreated = await User.create({
        email: profile._json.id,
        firstName: profile._json.name,
        lastName: ' ',
        age:0,
        password: createHash('gitHubUser')
      });
      return done(null, userCreated);
    } catch (error) {
      console.error(error.stack);
      return done(error);
    }
  }))

  passport.serializeUser((user, done) => {
    console.log(user);
    if (Array.isArray(user)) return done(null, user[0]._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserManager.findById(id);
    done(null, user);
  });

  passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      console.log(email, password);
      const user = await SessionManager.login({ email, password });
      return done(null, user);
    } catch (error) {
      if (error instanceof BadRequest) done(null, false)
      return done(error);
    }
  }))
}

export default initializePassport;