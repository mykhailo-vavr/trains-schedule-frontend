import { WebRoute } from '@/types';
import { notFound, redirect as nextRedirect } from 'next/navigation';

export { notFound } from 'next/navigation';

export const redirect = (webRoute?: WebRoute) => {
  if (!webRoute) {
    notFound();
  }

  nextRedirect(webRoute);
};
