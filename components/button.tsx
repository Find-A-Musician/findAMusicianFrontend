import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  label: string;
  layout?: 'filled' | 'bordered';
  bold?: boolean;
  type?: 'button' | 'submit';
  isLarge?: boolean;
};

export default function Button({
  label,
  layout = 'filled',
  bold = false,
  type = 'button',
  isLarge,
  ...props
}: ButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>): JSX.Element {
  return (
    <button
      className={`${bold ? 'font-bold' : ''} ${
        layout === 'filled'
      }  rounded-lg`}
      {...props}
    >
      {label}
    </button>
  );
}
