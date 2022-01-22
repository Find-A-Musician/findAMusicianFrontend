import type { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ALL_ICONS, ICONS_DEFINITION } from '../utils/icons';

export const INPUT_TYPES = [
  'password',
  'text',
  'search',
  'number',
  'email',
] as const;

type InputTypes = typeof INPUT_TYPES[number];

type TextInputProps = {
  type: InputTypes;
  id: string;
  label: string;
  icon?: ALL_ICONS;
};

export default function TextInput({
  type,
  id,
  label,
  icon,
  ...props
}: TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>) {
  return (
    <div className="flex flex-col items-start relative">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <div className="px-2 py-1 border-2 shadow-sm w-80 h-12 focus-within:border-red-800 focus-within:border-2 rounded-2xl flex itmes-center flex-start">
        {icon && (
          <span className="h-full flex mx-2">
            <FontAwesomeIcon
              icon={ICONS_DEFINITION[icon].icon}
              className={`${ICONS_DEFINITION[icon].color} text-lg m-auto`}
            />
          </span>
        )}
        <input
          className=" h-full w-full outline-none border-none flex-1"
          type={type}
          id={id}
          {...props}
        />
      </div>
      {/* <FontAwesomeIcon icon={faSearch} className="absolute top-10" /> */}
    </div>
  );
}
