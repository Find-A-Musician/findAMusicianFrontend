import { useFetcher } from './fetcher';
import { Groups, Pagination } from '../types';
import useSWR from 'swr';

export function useGetGroups(filters?: any) {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Pagination<Groups>>(
    ['/groups', filters],
    (url) => authFetch(url, filters),
  );
  return { data, error };
}
