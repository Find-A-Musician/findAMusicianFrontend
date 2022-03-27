import { MembershipNotification } from '../../types';
import NotificationWrapper from './NotificationWrapper';

type Props = {
  membershipNotification: MembershipNotification;
  close: () => void;
};

export function NotificationMembership({
  membershipNotification,
  close,
}: Props) {
  return (
    <NotificationWrapper
      title={
        <>
          <span className="font-bold">Bravo! Vous êtes à présent</span>
          <span className="italic">
            {''} {membershipNotification.membership} {''}
          </span>
          <span className="font-bold">au sein du groupe</span>
          <span className="italic">
            {''} {membershipNotification.group.name}
          </span>
        </>
      }
      close={close}
      gradientClass="bg-gradient-to-r from-violet-500 to-pink-400"
    />
  );
}

export default NotificationMembership;
