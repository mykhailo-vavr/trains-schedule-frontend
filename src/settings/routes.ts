export const webRoutes = {
  public: {
    LANDING_PAGE: '/',
    ERROR_404: '/404',
    SIGN_UP: '/sign-up',
    SIGN_IN: '/sign-in',
  },
  private: {
    PROFILE: '/profile',
    SCHEDULE: '/schedule',
    SCHEDULE_CREATE: '/schedule/create',
    SCHEDULE_UPDATE: '/schedule/update/[id]',
  },
} as const;
