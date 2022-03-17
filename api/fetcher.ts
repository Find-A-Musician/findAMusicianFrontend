import { AxiosResponse } from 'axios';
import { useAxios } from '../context/AxiosContext';

export function useFetcher() {
  const { publicAxios, authAxios } = useAxios();

  const publicFetch = (url: string, filters: any) =>
    publicAxios
      .get(url, filters)
      .then((res: AxiosResponse<any, any>) => res.data);

  const authFetch = (url: string, filters?: any) =>
    authAxios
      .get(url, filters)
      .then((res: AxiosResponse<any, any>) => res.data);

  return { publicFetch, authFetch };
}
