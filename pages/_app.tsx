import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { AxiosProvider } from '../context/AxiosContext';
import AppLayout from '../layout/app';
import RouteGuard from '../guard/routeGuard';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';
import { errorMiddleware } from '../Middleware/swrErrorToast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ use: [errorMiddleware] }}>
      <AuthProvider>
        <AxiosProvider>
          <RouteGuard>
            <AppLayout>
              <>
                <Component {...pageProps} />
                <ToastContainer />
              </>
            </AppLayout>
          </RouteGuard>
        </AxiosProvider>
      </AuthProvider>
    </SWRConfig>
  );
}

export default MyApp;
