import { Genre } from '../types';
import { useFetcher } from './fetcher';
import useSWR from 'swr';

export function useGetGenres() {
  const { publicFetch } = useFetcher();
  const { data, error } = useSWR<Genre[]>('/genres', publicFetch);
  return { data, error };
}
