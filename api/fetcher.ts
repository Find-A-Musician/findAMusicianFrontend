import { AxiosResponse } from 'axios';
import { FiltersType } from '../components/DataEntry/Filters';
import { useAxios } from '../context/AxiosContext';

export function useFetcher() {
  const { publicAxios, authAxios } = useAxios();

  const publicFetch = (url: string, filters: any) =>
    publicAxios
      .get(url, filters)
      .then((res: AxiosResponse<any, any>) => res.data);

  const authFetch = (url: string, filters?: any) =>
    authAxios
      .get(url, filters)
      .then((res: AxiosResponse<any, any>) => res.data);

  return { publicFetch, authFetch };
}

export function paramsToString(filters?: FiltersType, page = 0, limit = 20) {
  const searchParams = new URLSearchParams();
  if (filters) {
    if (filters.params.name) searchParams.append('name', filters.params.name);
    if (filters.params.location?.length)
      filters.params.location.forEach((l) =>
        searchParams.append('location', l),
      );
    if (filters.params.genres?.length)
      filters.params.genres.forEach((l) => searchParams.append('genres', l));
    if (filters.params.instruments?.length)
      filters.params.instruments.forEach((l) =>
        searchParams.append('instruments', l),
      );
    if (filters.params.promotion?.length)
      filters.params.promotion.forEach((l) =>
        searchParams.append('promotion', l),
      );
  }
  searchParams.append('start', `${page * limit}`);
  searchParams.append('limit', '20');

  console.log(searchParams.toString());

  return searchParams.toString();
}
