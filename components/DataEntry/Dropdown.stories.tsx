import Dropdown from './Dropdown';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { Options } from './Dropdown';

export default {
  title: 'Form/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [selected, setSelected] = useState<string[]>([]);
  const options = [
    {
      label: 'Rock',
      value: 'rock',
    },
    {
      label: 'Meta',
      value: 'metal',
    },
    {
      label: 'Rap',
      value: 'rap',
    },
  ] as Options<string>[];
  return (
    <Dropdown
      {...args}
      options={options}
      selected={selected}
      setSelected={setSelected}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Genres',
};
