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
  isFull?: boolean;
};

export default function TextInput({
  type,
  id,
  label,
  icon,
  isFull,
  ...props
}: TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>) {
  return (
    <div className={`flex flex-col gap-2 relative ${isFull ? 'w-full' : ''}`}>
      <label htmlFor={id} className="font-medium text-gray-800">
        {label}
      </label>
      <div
        className={` border-2 shadow-sm ${
          isFull ? 'w-full' : 'w-80'
        } h-12 focus-within:border-red-800 focus-within:border-2 rounded-lg flex itmes-center overflow-hidden relative`}
      >
        {icon && (
          <span className="h-full flex absolute left-0 px-2">
            <FontAwesomeIcon
              icon={ICONS_DEFINITION[icon].icon}
              className={`text-lg m-auto ${ICONS_DEFINITION[icon].color}`}
            />
          </span>
        )}
        <input
          className={`outline-none border-none flex-1 px-2 py-1 ${
            icon ? 'pl-8' : ''
          }`}
          type={type}
          id={id}
          {...props}
        />
      </div>
      {/* <FontAwesomeIcon icon={faSearch} className="absolute top-10" /> */}
    </div>
  );
}
