import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { FiltersType } from '../components/DataEntry/Filters';
import { useAxios } from '../context/AxiosContext';
import { Groups } from '../types';
import { paramsToString, useFetcher } from './fetcher';

export function useGetGroups(filters: FiltersType) {
  const { authAxios } = useAxios();

  const getKey = (pageIndex: number, previousPageData?: Groups[][]) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `/groups?${paramsToString(filters, pageIndex)}`;
  };

  const {
    data: rawData,
    error,
    size,
    setSize,
  } = useSWRInfinite<Groups[]>(getKey, (url: string) =>
    authAxios.get(url).then((res) => res.data.results),
  );

  const data = rawData?.flat();

  return { data, error, size, setSize };
}

export function useGetGroupDetails(groupID?: string) {
  const { authFetch } = useFetcher();
  const { data, error } = useSWR<Groups>(
    groupID ? `/groups/${groupID}` : null,
    authFetch,
  );
  return { data, error };
}
