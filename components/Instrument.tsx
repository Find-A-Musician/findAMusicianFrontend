import Image from 'next/image';
import { INSTRUMENT_NAME } from '../types/api';

export default function Instrument({
  instrument,
}: {
  instrument: INSTRUMENT_NAME;
}) {
  return (
    <div className="w-6 mr-4">
      <Image
        src={require(`../assets/${instrument}.svg`)}
        alt="An instrument logo"
        width={50}
        height={50}
      />
    </div>
  );
}
