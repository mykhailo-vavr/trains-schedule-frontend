import { apiRoutes } from '../settings';

export type ApiRoute = Omit<typeof apiRoutes, 'BASE_URL'>[keyof Omit<typeof apiRoutes, 'BASE_URL' | 'URL_PREFIX'>];

export type ExtendedApiRoute = `${ApiRoute}${string}`;
