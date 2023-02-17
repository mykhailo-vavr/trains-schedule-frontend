import { TokensTypeEnum } from '@/types';
import { decode, getItem, removeItem, setItem } from '@/utils';

export const tokenService = {
  get: {
    access: () => getItem(TokensTypeEnum.ACCESS_TOKEN),
  },

  set: {
    access: (token: string) => setItem(TokensTypeEnum.ACCESS_TOKEN, token),
  },

  remove: {
    access: () => removeItem(TokensTypeEnum.ACCESS_TOKEN),
  },

  decode: {
    access: () => {
      const result = decode<{ userId: number }>(tokenService.get.access() || '');
      return result;
    },
  },

  expired: {
    access: () => {
      const accessTokenData = tokenService.decode.access();

      if (!accessTokenData) {
        throw new Error('There is no access token');
      }

      return Number(accessTokenData?.exp) * 1000 < Date.now();
    },
  },
};
