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
        } bg-gradient-to-r from-red-gradient via-middle-gradient to-purple-gradient rounded-3xl ${
          isLarge ? 'py-2 px-14' : 'px-4 py-2'
        } rounded-3xl `}
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
        } bg-gradient-to-r from-red-gradient via-middle-gradient to-purple-gradient rounded-3xl relative flex items-center justify-center  py-1 px-1`}
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

/* <button */
// className={`relative ${bold ? 'font-bold' : ''} ${
// layout === 'filled'
// ? 'bg-gradient-to-r from-red-gradient via-middle-gradient to-purple-gradient text-white '
// : 'bg-white text-black before:bg-gradient-to-r from-red-gradient via-middle-gradient to-purple-gradient before:absolute before:top-[-5px] before:left-[-5px] before:right-[-5px] before:bottom-[-5px] before:-z-10 before:rounded-3xl'
// } ${isLarge ? 'py-2 px-14' : 'px-4 py-2'} rounded-3xl `}
// {...props}
/* > */
/* {} */
/* {label} */
/* </button> */
