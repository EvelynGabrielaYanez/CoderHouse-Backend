export const nodeEnv = {
  development: 'development',
  production: 'production'
};

export const recoverUserPath = '/api/user/recover';

export const swaggerApi = '/api-docs'

export const publicRoutes = [
  '/products',
  '/profile',
  '/documents'
]

export const unauthorizedEndpondList = [
  '/api/session/login',
  '/api/user',
  '/api/user/send-recover-email',
];

export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
  PREMIUM: 'Premium'
}

export const baseURL = 'http://localhost:8080';