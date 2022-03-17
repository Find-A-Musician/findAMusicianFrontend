import Image from 'next/image';
import { Instrument } from '../types';

export default function InstrumentLabel({
  instrument,
}: {
  instrument: Instrument;
}) {
  return (
    <div className="w-6 mr-4">
      <Image
        src={require(`../assets/${instrument.name}.svg`)}
        alt="An instrument logo"
        width={50}
        height={50}
      />
    </div>
  );
}
