import { useEffect } from 'react';
import { useNotifications } from '../../api';

export function NotificationHandler() {
  const { useGetNotifications } = useNotifications();
  const { data: notificationList } = useGetNotifications();
  useEffect(() => {
    console.log(notificationList);
  }, [notificationList]);

  return <div>NotificationHandler</div>;
}

export default NotificationHandler;
