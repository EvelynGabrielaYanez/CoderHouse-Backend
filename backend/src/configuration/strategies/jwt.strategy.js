import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserManager from '../../service/user/userManager.js';
import { recoverUserPath } from '../../utils/constants.js';

const cookieExtractor = req => req.path !== recoverUserPath ? req => req?.cookies?.jwt : req?.cookies.jwtRecover;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET
};

export const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await UserManager.findById(payload.user._id);
    return  done(null, user ?? false);
  } catch (error) {
    return done(error, false);
  }
});

