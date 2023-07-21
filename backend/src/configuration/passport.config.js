import passport from 'passport';
import { gitHubStrategy } from './strategies/gitHub.strategy.js';
import { jwtStrategy } from './strategies/jwt.strategy.js';

const initializePassport = () => {
  passport.use(jwtStrategy);
  passport.use('github', gitHubStrategy);
}

export default initializePassport;
