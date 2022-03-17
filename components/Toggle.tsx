import { Dispatch, SetStateAction } from 'react';

type Props = {
  checkLabel: string;
  uncheckLabel: string;
  isCheck: boolean;
  onClick: () => void;
};
export function Toggle({
  checkLabel,
  uncheckLabel,
  isCheck,
  onClick,
}: Props): JSX.Element {
  return (
    <button
      type="button"
      className={`rounded border px-4 py-2 ${
        isCheck ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
      }`}
      onClick={onClick}
    >
      {isCheck ? checkLabel : uncheckLabel}
    </button>
  );
}

export default Toggle;
