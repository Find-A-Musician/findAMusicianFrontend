import { useEffect } from 'react';
import { useNotifications } from '../../api';
import { GroupKickNotification } from '../../types';
import NotificationGroupKick from './NotificationGroupKick';

export function NotificationHandler() {
  const { useGetNotifications, deleteNotification } = useNotifications();
  const { data: notificationList } = useGetNotifications();
  useEffect(() => {
    console.log(notificationList);
  }, [notificationList]);

  if (notificationList)
    return (
      <>
        {notificationList.map((notification) => {
          switch (notification.type) {
            case 'GroupKickNotification':
              return (
                <NotificationGroupKick
                  kickNotification={notification as GroupKickNotification}
                  close={() => deleteNotification(notification.id)}
                />
              );
          }
        })}
      </>
    );

  return <div></div>;
}

export default NotificationHandler;
