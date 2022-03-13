import { InputHTMLAttributes, useState } from 'react';

type Props = {
  id: string;
  value: string;
  label: string;
  placeholder?: string;
  icon?: JSX.Element;
  displayLabel?: boolean;
  type?: string;
  className?: string;
};

export function Input({
  id,
  value,
  label,
  placeholder,
  icon,
  displayLabel = false,
  type = 'text',
  className,
  ...props
}: Props & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={`inline-block flex flex-col gap-1 ${className}`}>
      {displayLabel && (
        <label
          className={`${displayLabel ? 'visible' : 'invisible'} ${
            isFocus ? 'text-red-500' : 'text-gray-700'
          }`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div
        className={`flex justify-between items-center border rounded ${
          isFocus ? 'border-red-300' : ''
        }`}
      >
        <input
          id={id}
          type={type}
          className="py-1.5 px-3 w-full rounded ring-0 outline-0 focus:border-red-200 text-gray-500"
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...props}
        />
        {icon && (
          <span
            className={`mx-2 ${isFocus ? 'text-red-400' : 'text-gray-600'}`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
