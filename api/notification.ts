import useSWR, { mutate } from 'swr';
import { useAxios } from '../context/AxiosContext';
import { Notification } from '../types';
import { useFetcher } from './fetcher';

function useGetNotifications() {
  const { authFetch } = useFetcher();
  const response = useSWR<Notification[]>('/profil/notifications', authFetch);
  return response;
}

export function useNotifications() {
  const { authAxios } = useAxios();

  async function deleteNotification(notificationID: string) {
    return await authAxios
      .delete(`/profil/notifications/${notificationID}`)
      .then(() => mutate(`/profil/notifications`));
  }

  return { useGetNotifications, deleteNotification };
}
