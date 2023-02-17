'use client';

import { webRoutes } from '@/settings';
import { useRouter } from 'next/navigation';
import { useUser } from './useUser';

export const useRedirectToProfile = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  if (isAuthenticated) {
    router.push(webRoutes.private.PROFILE);
  }
};
