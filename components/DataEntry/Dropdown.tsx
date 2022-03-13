import { Dispatch, SetStateAction, useState } from 'react';
import { ICheck, IChevronBottom } from '../icons';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export type Options<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  label: string;
  options: Options<T>[];
  selected: T[];
  setSelected: Dispatch<SetStateAction<T[]>>;
  disableBackgroundColor?: boolean;
  className?: string;
};
export function Dropdown<T>({
  label,
  options,
  selected,
  setSelected,
  disableBackgroundColor,
  className,
}: Props<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  function isSelected(value: T): boolean {
    return selected.includes(value);
  }

  function nothingSelected() {
    return !selected.length;
  }

  function handleSelect(value: T): void {
    if (isSelected(value)) setSelected(selected.filter((v) => v !== value));
    else setSelected([...selected, value]);
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex justify-between items-center border rounded gap-10 py-1.5 px-3 ${
          nothingSelected() || disableBackgroundColor
            ? 'text-gray-700 hover:bg-gray-50'
            : 'bg-red-500 text-white'
        } ${className}`}
      >
        {label}
        <div
          className={`flex flex-col text-sm items-center ${
            nothingSelected() || disableBackgroundColor
              ? 'text-gray-500'
              : 'text-white'
          }`}
        >
          <IChevronBottom />
        </div>
      </button>
      {isOpen && (
        <div
          ref={ref}
          className="z-40 absolute top-11 flex flex-col border bg-white rounded shadow-lg"
        >
          {options.map((option, index) => (
            <button
              type="button"
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

export default Dropdown;
