import { useUserContext } from '@/context/user';
import { tokenService } from '@/services';
import { webRoutes } from '@/settings';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useSignOut = () => {
  const { clearUserState } = useUserContext();
  const router = useRouter();

  return useCallback(() => {
    const asyncWrapper = async () => {
      tokenService.remove.access();

      clearUserState();

      setTimeout(() => router.push(webRoutes.public.LANDING_PAGE));
    };

    asyncWrapper().catch(console.error);
  }, [clearUserState, router]);
};
