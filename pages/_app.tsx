import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
function MyApp({ Component, pageProps }: AppProps) {
  const { authAxios, refreshAuthLogic } = useAxios();

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {
    statusCodes: [401, 403],
  });

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
