import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserManager from '../../controllers/user/userController.js';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
    secretOrKey: process.env.JWT_SECRET
}

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        console.log("Entraaaaaaaaaaaaaaaaaaa",payload)
        const user = await UserManager.findById(payload._id);
        return  done(null, user ?? false);
    } catch (error) {
        return done(error, false);
    }
})
