import axios from 'axios';
import { apiRoutes } from './settings';

// TODO: auth token placed here

const apiClient = axios.create({
  baseURL: apiRoutes.BASE_URL + apiRoutes.URL_PREFIX,
});

export { apiClient };
