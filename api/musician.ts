import { useFetcher } from './fetcher';
import { Musician } from '../types';
import useSWR from 'swr';

export function useGetMusicians() {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Musician[]>('/musicians', authFetch);
  return { data, error };
}
