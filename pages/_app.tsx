import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { AxiosProvider } from '../context/AxiosContext';
import RouteGuard from '../guard/routeGuard';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AxiosProvider>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default MyApp;
