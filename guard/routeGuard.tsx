import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const PublicRoute = ['/login', '/register'];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loadingProfil, isAuthenticated } = useAuth();

  useEffect(() => {
    checkAuth(router.pathname);

    router.events.on('routeChangeComplete', checkAuth);

    return router.events.off('routeChangeComplete', checkAuth);
  }, [loadingProfil]);

  function checkAuth(path: string) {
    if (isAuthenticated() && PublicRoute.includes(path)) {
      router.push('/musicians');
    } else if (
      !isAuthenticated() &&
      !loadingProfil &&
      !PublicRoute.includes(path)
    ) {
      router.push({
        pathname: '/login',
        query: { redirectTo: path },
      });
    }
  }

  if (loadingProfil) {
    return <p>Loading the application ...</p>;
  }

  return <>{children}</>;
}
