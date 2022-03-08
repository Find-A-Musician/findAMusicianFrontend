import Dropdown from './Dropdown';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Input/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [selected, setSelected] = useState<string[]>([]);
  return <Dropdown {...args} selected={selected} setSelected={setSelected} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'Genres',
  options: [
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
  ],
};
