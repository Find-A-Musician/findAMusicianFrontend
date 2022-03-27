import useSWR from 'swr';
import { useAxios } from '../context/AxiosContext';
import { useFetcher } from './fetcher';

function useGetNotifications() {
  const { authFetch } = useFetcher();
  const response = useSWR('/profil/notifications', authFetch);
  return response;
}

export function useNotifications() {
  const { authAxios } = useAxios();

  async function deleteNotification(notificationID: string) {
    return await authAxios.delete(`/profil/notifications/${notificationID}`);
  }

  return { useGetNotifications, deleteNotification };
}
