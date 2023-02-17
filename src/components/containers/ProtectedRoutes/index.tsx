'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSignOut, useUser } from '@/hooks';
import { webRoutes } from '@/settings';
import { FCWithChildren, PublicWebRoute } from '@/types';
import { tokenService } from '@/services';
import { usePathname } from 'next/navigation';
import { redirect } from '@/utils';

const ProtectedRoutes: FCWithChildren = ({ children }) => {
  const { isAuthenticated } = useUser();
  const pathname = usePathname();
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);

    // To sign out when clear localStorage
    const accessToken = tokenService.get.access();

    if (!accessToken) {
      setLoading(false);
      signOut();
      return;
    }

    const isAccessTokenExpired = tokenService.expired.access();

    if (isAccessTokenExpired) {
      setLoading(false);
      signOut();
    }

    setLoading(false);
  });

  const isPublicRoute = useMemo(() => Object.values(webRoutes.public).includes(pathname as PublicWebRoute), [pathname]);

  if (loading) {
    return null;
  }

  if (isPublicRoute) {
    return children;
  }

  if (!isAuthenticated) {
    redirect(webRoutes.public.ERROR_404);
  }

  return children;
};

export default ProtectedRoutes;
