import NotificationWrapper from './NotificationWrapper';

type Props = {
  groupName: string;
};

export function NotificationGroupKick({ groupName }: Props) {
  return (
    <NotificationWrapper
      title={
        <>
          <span className="font-bold">Vous avez été viré du groupe: </span>
          <span className="italic">{groupName}</span>
        </>
      }
      close={() => console.log('close')}
      gradientClass="bg-gradient-to-r from-red-500 to-pink-600"
    />
  );
}

export default NotificationGroupKick;
