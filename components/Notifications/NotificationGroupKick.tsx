import { AxiosResponse } from 'axios';
import { GroupKickNotification } from '../../types';
import NotificationWrapper from './NotificationWrapper';

type Props = {
  kickNotification: GroupKickNotification;
  close: () => void;
};

export function NotificationGroupKick({ kickNotification, close }: Props) {
  return (
    <NotificationWrapper
      title={
        <>
          <span className="font-bold">Vous avez été viré du groupe: </span>
          <span className="italic">{kickNotification.group.name}</span>
        </>
      }
      close={close}
      gradientClass="bg-gradient-to-r from-red-500 to-pink-600"
    />
  );
}

export default NotificationGroupKick;
