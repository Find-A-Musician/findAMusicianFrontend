import { spawn } from 'child_process';
import LoaderSpinner from './loaderSpinner';

export default function StatsInfo({
  label,
  number,
}: {
  label: string;
  number: number | null;
}): JSX.Element {
  return (
    <p className="flex flex-wrap justify-start items-center">
      {number && (
        <span className="text-red-700 font-bold text-3xl mx-3">{number}</span>
      )}
      {!number && (
        <span className="mx-3">
          <LoaderSpinner size="sm" />
        </span>
      )}
      <span className="text-black font-bold text-sm"> {label} </span>
    </p>
  );
}
