import { useFetcher } from './fetcher';
import useSWR from 'swr';
import { Musician } from '../types';
import { useGetGroupDetails } from './group';

export function useGetProfil() {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Musician>('/profil', authFetch);
  return { data, error };
}
