// TODO: create getConfig func

export const apiRoutes = {
  URL_PREFIX: process.env.NEXT_PUBLIC_URL_PREFIX || '',
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  USERS: '/users',
  SCHEDULES: '/schedules',
} as const;
