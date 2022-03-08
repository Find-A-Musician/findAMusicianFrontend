import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import Input from './Input';

export default {
  title: 'Form/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Input> = (args) => {
  const [value, setValue] = useState('');
  return (
    <div>
      <Input {...args} value={value} setValue={setValue} />
      <span className="block mt-12">value: {value}</span>
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  label: 'rechercher',
};
