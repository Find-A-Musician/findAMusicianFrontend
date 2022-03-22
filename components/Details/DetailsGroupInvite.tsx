import { ICheck, IClose } from '../icons';

type Props = {
  groupName: string;
  instrument: string;
  locations: string[];
  description: string;
};

export function DetailsGroupInvite({
  groupName,
  instrument,
  locations,
  description,
}: Props) {
  return (
    <div className="text-white bg-gradient-to-r from-green-500 to-emerald-400 rounded px-6 py-5 flex items-center gap-5">
      <div className="grow">
        <div className="mb-3 text-xl">
          <span className="font-bold">Invitation à rejoindre : </span>
          <span className="italic">{groupName}</span>
          <span className="font-bold"> en tant que </span>
          <span className="italic">{instrument}</span>
          <span className="font-bold"> à </span>
          <span className="italic">
            {locations.map((location) => location).join('/')}
          </span>
        </div>
        <span className="block text-gray-100">{description}</span>
      </div>
      <div className="flex gap-4">
        <ICheck size="40px" />
        <IClose size="40px" />
      </div>
    </div>
  );
}
