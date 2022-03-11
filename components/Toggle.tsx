import { Dispatch, SetStateAction } from 'react';

type Props = {
  checkLabel: string;
  uncheckLabel: string;
  isCheck: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
};
export function Toggle({
  checkLabel,
  uncheckLabel,
  isCheck,
  setIsCheck,
}: Props): JSX.Element {
  return (
    <button
      type="button"
      className={`rounded border px-4 py-2 ${
        isCheck ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
      }`}
      onClick={() => setIsCheck(!isCheck)}
    >
      {isCheck ? checkLabel : uncheckLabel}
    </button>
  );
}

export default Toggle;
