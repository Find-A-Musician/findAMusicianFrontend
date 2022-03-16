import { useFetcher } from './fetcher';
import { Instrument } from '../types';
import useSWR from 'swr';

export function useGetInstruments() {
  const { publicFetch } = useFetcher();
  const { data, error } = useSWR<Instrument[]>('/instruments', publicFetch);
  return { data, error };
}
