import { useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Select<T>({
  label,
  options,
  selectedOption,
  setSelectedOption,
  isFull,
  tabIndex,
}: {
  label: string;
  options: T[] | readonly T[];
  selectedOption: string;
  setSelectedOption: (arg: T) => void;
  isFull?: boolean;
  tabIndex?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div className=" flex flex-col items-start">
      <p className="font-bold"> {label}</p>
      <div
        className={`${
          isFull ? 'w-full' : 'w-80'
        } h-12 relative cursor-pointer border-2 border-gray-300 focus:border-red-800 w-full rounded-2xl flex items-center justify-start px-4 `}
        ref={ref}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={tabIndex || 0}
      >
        <span> {selectedOption} </span>
        <FontAwesomeIcon
          className="absolute text-xl right-4 text-gray-500 "
          icon={faChevronDown}
        />
        {isOpen && (
          <div className="absolute top-12 w-full overflow-y-auto max-h-52 flex flex-col items-start justify-start bg-white z-10 shadow-complete left-0 rounded-xl ">
            {options.map((item, index) => (
              <p
                className="py-2 px-3 hover:bg-red-100 w-full"
                onClick={() => setSelectedOption(item)}
                key={`${item}-${index}`}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
