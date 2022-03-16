import { AxiosResponse } from 'axios';
import { useAxios } from '../context/AxiosContext';

export function useFetcher() {
  const { publicAxios, authAxios } = useAxios();

  const publicFetch = (url: string) =>
    publicAxios.get(url).then((res: AxiosResponse<any, any>) => res.data);

  const authFetch = (url: string) =>
    authAxios.get(url).then((res: AxiosResponse<any, any>) => res.data);

  return { publicFetch, authFetch };
}
