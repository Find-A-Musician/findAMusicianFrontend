import TextInput, { INPUT_TYPES } from './textInput';
import { Meta } from '@storybook/react';

export default {
  title: 'Form/TextInput',
  component: TextInput,
  argTypes: {
    type: {
      control: 'select',
      options: INPUT_TYPES,
      defaultValue: 'text',
    },
  },
} as Meta;

export { TextInput };
