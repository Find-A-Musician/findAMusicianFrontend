import { useAxios } from '../context/AxiosContext';
import { Instrument } from '../types';
import useSWR from 'swr';

export function useGetInstruments() {
  const { publicAxios } = useAxios();

  const { data, error } = useSWR<Instrument[]>('/instruments', (url) =>
    publicAxios.get(url).then((res) => res.data),
  );

  return { data, error };
}
