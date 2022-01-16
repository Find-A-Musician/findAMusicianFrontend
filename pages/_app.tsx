import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { AxiosProvider } from '../context/AxiosContext';
import AppLayout from '../layout/app';
import RouteGuard from '../guard/routeGuard';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AxiosProvider>
        <RouteGuard>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </RouteGuard>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default MyApp;
