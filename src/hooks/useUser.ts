'use client';

import { useUserContext } from '@/context/user';
import { useMemo } from 'react';

export const useUser = () => {
  const { state } = useUserContext();

  return useMemo(
    () => ({
      ...state,
      isAuthenticated: !!state.id,
    }),
    [state],
  );
};
