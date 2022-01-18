import type { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
};

export default function TextInput({
  type,
  id,
  label,
  ...props
}: TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>) {
  return (
    <div className="flex flex-col items-start">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        className="px-2 py-1 drop-shadow-sm outline-none rounded-2xl w-72 h-12 focus:border-red-800 border-2 "
        type={type}
        id={id}
        {...props}
        // Add search icon there ..
        placeholder={
          type === 'search' ? `${props.placeholder}` : props.placeholder
        }
      />
    </div>
  );
}
