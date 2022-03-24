import ReactSelect from 'react-select';
import { customStyles, customTheme } from '../utils/selectCustomTheme';
import { Options } from './DataEntry/Dropdown';

type Props<T> = {
  value?: Options<T> | Options<T>[];
  onChange?: (e: any) => void;
  isMulti?: boolean;
  options?: Options<T>[];
};

export function Select<T>({
  value,
  onChange,
  isMulti,
  options,
  ...props
}: Props<T>) {
  return (
    <ReactSelect
      styles={customStyles}
      theme={customTheme}
      value={value}
      onChange={onChange}
      isMulti={isMulti}
      options={options}
      {...props}
    />
  );
}
