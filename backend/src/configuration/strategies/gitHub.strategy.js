
import UserManager from '../../service/user/userManager.js';
import GitHubStrategy from 'passport-github2';
import User from '../../dao/models/user.js';
import { createHash } from '../../utils/bcrypt.js';
import CartsManager from '../../service/carts/cartsManager.js';
import env  from '../../configuration/config.js';
import { baseURL } from '../../utils/constants.js';

export const gitHubStrategy = new GitHubStrategy({
  clientID: env.clientId,
  clientSecret: env.clientSecret,
  callbackURL: `${baseURL}/authSession/githubSession`,
  passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const user = await UserManager.getUser(profile._json.id);
    if (user) return done(null, user);
    const cart = await (new CartsManager()).save();
    const userCreated = await User.create({
      email: profile._json.id,
      firstName: profile._json.name,
      lastName: ' ',
      age:0,
      cart,
      password: createHash('gitHubUser')
    });
    return done(null, userCreated);
  } catch (error) {
    console.error(error.stack);
    return done(error);
  }
})