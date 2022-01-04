import type { InputHTMLAttributes } from 'react';

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
};

export default function TextInput({
  type,
  ...props
}: TextInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  return (
    <input
      className="px-2 py-1 drop-shadow-sm outline-none rounded-2xl w-72 h-12 focus:border-red-800 border-2 "
      type={type}
      {...props}
    />
  );
}
