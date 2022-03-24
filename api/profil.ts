import { useFetcher } from './fetcher';
import useSWR from 'swr';
import { Musician } from '../types';

export function useGetProfil() {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Musician>('/profil', authFetch);
  return { data, error };
}
