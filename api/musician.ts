import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { FiltersType } from '../components/DataEntry/Filters';
import { useAxios } from '../context/AxiosContext';
import { Groups, Musician } from '../types';
import { paramsToString, useFetcher } from './fetcher';

export function useGetMusicians(filters: FiltersType) {
  const { authAxios } = useAxios();

  const getKey = (pageIndex: number, previousPageData?: Musician[][]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/musicians?${paramsToString(filters, pageIndex)}`;
  };

  const {
    data: rawData,
    error,
    size,
    setSize,
  } = useSWRInfinite<Musician[]>(getKey, (url: string) =>
    authAxios.get(url).then((res) => res.data.results),
  );

  const data = rawData?.flat();

  return { data, error, size, setSize };
}

export function useGetMusicianGroups(musicianID?: string) {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Groups>(
    musicianID ? `/musicians/${musicianID}/groups` : null,
    authFetch,
  );
  return { data, error };
}
