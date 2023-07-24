import fs from 'fs';

export const nodeEnv = {
  development: 'development',
  production: 'production'
};

export const recoverUserPath = '/api/user/recover';

export const swaggerApi = '/api-docs'
export const publicRoutes = fs.readdirSync('src/public/').map(route => `/${route}`);

export const unauthorizedEndpondList = [
  '/api/session/login',
  '/api/user/register',
  '/api/user/send-recover-email'
];

export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
  PREMIUM: 'Premium'
}

export const baseURL = 'http://localhost:8080';