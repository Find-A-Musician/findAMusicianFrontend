import { spawn } from 'child_process';
import LoaderSpinner from './LoaderSpinner';

export default function StatsInfo({
  label,
  number,
}: {
  label: string;
  number: number | null;
}): JSX.Element {
  return (
    <div className="flex flex-wrap justify-start items-center">
      {number !== null && number !== undefined ? (
        <span className="text-red-700 font-bold text-4xl mx-3">{number}</span>
      ) : (
        <span className="mx-3">
          <LoaderSpinner size="sm" />
        </span>
      )}

      <span className="text-black text-lg font-bold "> {label} </span>
    </div>
  );
}
