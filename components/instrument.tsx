import Image from 'next/image';

export const INSTRUMENTS = ['drums', 'guitar', 'piano'] as const;

type InstrumentsName = typeof INSTRUMENTS[number];

export default function Instrument({
  instrument,
}: {
  instrument: InstrumentsName;
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
