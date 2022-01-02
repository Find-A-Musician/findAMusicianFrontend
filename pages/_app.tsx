import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { AxiosProvider } from '../context/AxiosContext';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AxiosProvider>
        <Component {...pageProps} />
      </AxiosProvider>
    </AuthProvider>
  );
}

export default MyApp;
