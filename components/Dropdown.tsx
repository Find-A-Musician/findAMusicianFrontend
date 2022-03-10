import { useState } from 'react';
import { ICheck, IChevronBottom } from './icons';
import useOnClickOutside from '../hooks/useOnClickOutside';

export type Options = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Options[];
  selected: string[];
  setSelected: (value: string[] | ((prevVar: string[]) => string[])) => void;
};
export default function Dropdown({
  label,
  options,
  selected,
  setSelected,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  function isSelected(value: string): boolean {
    return selected.includes(value);
  }

  function nothingSelected() {
    return !selected.length;
  }

  function handleSelect(value: string): void {
    if (isSelected(value)) setSelected(selected.filter((v) => v !== value));
    else setSelected([...selected, value]);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center border rounded  gap-10 py-1.5 px-3 ${
          nothingSelected()
            ? 'text-gray-700 hover:bg-gray-50'
            : 'bg-red-500 text-white'
        }`}
      >
        {label}
        <div
          className={`flex flex-col text-sm items-center ${
            nothingSelected() ? 'text-gray-500' : 'text-white'
          }`}
        >
          <IChevronBottom />
        </div>
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="z-40 absolute top-11 flex flex-col border rounded shadow-lg"
        >
          {options.map((option, index) => (
            <button
              onClick={() => handleSelect(option.value)}
              className={`flex justify-between items-center gap-24 py-2 px-3 ${
                isSelected(option.value)
                  ? 'text-white bg-red-500 hover:bg-red-400'
                  : 'text-gray-700 hover:text-red-700 hover:bg-red-100'
              } `}
              key={index}
            >
              {option.label}
              <span
                className={isSelected(option.value) ? 'visible' : 'invisible'}
              >
                <ICheck />
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
