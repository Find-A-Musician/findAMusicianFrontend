import style from '../styles/textInput.module.css';
import type { InputHTMLAttributes } from 'react';
import { types } from '@storybook/addons';

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
    <div className={`${style.container}`}>
      <input type={type} {...props} />
    </div>
  );
}
