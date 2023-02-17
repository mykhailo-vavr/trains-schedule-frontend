import { apiRoutes } from '../settings';
import { postApiData } from '../request';
import { AuthCredentials, SignInRequest, SignUpRequest, User } from '../models';

export const authenticationService = {
  async signUp(body: SignUpRequest) {
    return postApiData<User>(apiRoutes.SIGN_UP, body);
  },

  async signIn(body: SignInRequest) {
    return postApiData<AuthCredentials>(apiRoutes.SIGN_IN, body);
  },
};
