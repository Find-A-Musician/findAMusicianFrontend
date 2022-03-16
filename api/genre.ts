import { useAxios } from '../context/AxiosContext';
import { Genre } from '../types';
import useSWR from 'swr';

export function useGetGenres() {
  const { publicAxios } = useAxios();

  const { data, error } = useSWR<Genre[]>('/genres', (url) =>
    publicAxios.get(url).then((res) => res.data),
  );

  return { data, error };
}
