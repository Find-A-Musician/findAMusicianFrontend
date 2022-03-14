import { toast } from 'react-toastify';

export function errorMiddleware(useSWRNext: any) {
  const notifyError = () => toast.error('Error');
  return (key: any, fetcher: any, config: any) => {
    // Before hook runs...

    // Handle the next middleware, or the `useSWR` hook if this is the last one.
    const swr = useSWRNext(key, fetcher, config);

    if (swr.error) notifyError();
    // After hook runs...
    return swr;
  };
}

export default errorMiddleware;
