import { useFetcher } from './fetcher';
import { Musician, Pagination } from '../types';
import useSWR from 'swr';

export function useGetMusicians(filters?: any) {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Pagination<Musician>>(
    ['/musicians', filters],
    (url) => authFetch(url, filters),
  );
  return { data, error };
}
