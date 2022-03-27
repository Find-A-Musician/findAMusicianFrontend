import NotificationWrapper from './NotificationWrapper';

type Props = {
  groupName: string;
  instrument: string;
  locations: string[];
  description: string;
};

export function NotificationGroupInvite({
  groupName,
  instrument,
  locations,
  description,
}: Props) {
  return (
    <NotificationWrapper
      title={
        <>
          <span className="font-bold">Invitation à rejoindre : </span>
          <span className="italic">{groupName}</span>
          <span className="font-bold"> en tant que </span>
          <span className="italic">{instrument}</span>
          <span className="font-bold"> à </span>
          <span className="italic">
            {locations.map((location) => location).join('/')}
          </span>
        </>
      }
      description={description}
      hasChoice
      accept={() => console.log('accept')}
      close={() => console.log('close')}
      gradientClass="bg-gradient-to-r from-green-500 to-emerald-400"
    />
  );
}
