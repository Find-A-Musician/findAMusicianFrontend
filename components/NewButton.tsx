import { ButtonHTMLAttributes } from 'react';

type Props = {
  label: string;
  className?: string;
  secondary?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function NewButton({
  label,
  className,
  secondary,
  type = 'button',
  ...props
}: Props & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-sm ${
        secondary
          ? 'text-gray-800 border hover:bg-gray-100'
          : 'bg-red-500 text-white hover:bg-red-400'
      } transition ease-in-out duration-300 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
