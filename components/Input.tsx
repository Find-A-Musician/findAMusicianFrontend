import { useState } from 'react';
import { ISearch } from './icons';

type Props = {
  label: string;
  value: string;
  setValue: (value: string | ((prevVar: string) => string)) => void;
};

export default function Input({ label, value, setValue }: Props) {
  const [isFocus, setIsFocus] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <div
      className={`py-1.5 px-3 flex justify-between items-center border rounded ${
        isFocus ? 'border-red-300' : ''
      }`}
    >
      <input
        type="text"
        className="ring-0 outline-0 focus:border-red-200 text-gray-500 focus:text-red-500 focus:placeholder:text-red-300"
        placeholder={label}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleChange}
      />
      <span className={`${isFocus ? 'text-red-400' : 'text-gray-600'}`}>
        <ISearch />
      </span>
    </div>
  );
}
