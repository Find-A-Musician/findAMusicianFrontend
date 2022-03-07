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
  if (layout === 'filled') {
    return (
      <button
        type={type}
        {...props}
        className={`text-white ${
          bold ? 'font-bold' : ''
        } bg-gradient-to-r from-red-600 via-red-800 to-purple-1000 rounded-3xl ${
          isLarge ? 'py-2 px-14' : 'px-4 py-2'
        } rounded-3xl outline-none m-2   `}
      >
        {' '}
        {label}{' '}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        {...props}
        className={`text-black ${
          bold ? 'font-bold' : ''
        } bg-gradient-to-r from-red-600 via-red-800 to-purple-1000 rounded-3xl relative flex items-center justify-center  py-1 px-1 m-2`}
      >
        <span
          className={`bg-white rounded-3xl ${
            isLarge ? 'py-1 px-[3.25rem]' : 'px-3 py-1'
          }`}
        >
          {label}
        </span>
      </button>
    );
  }
}
