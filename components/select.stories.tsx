import Select from './select';
import { Meta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Form/Select',
  component: Select,
} as Meta;

export const Primary = () => {
  const options = ['L1', 'L2', 'L3', 'M1', 'M2'];

  const [selected, setSelected] = useState(options[0]);

  return (
    <Select
      label="Votre promotion"
      options={options}
      selectedOption={selected}
      setSelectedOption={setSelected}
    />
  );
};
