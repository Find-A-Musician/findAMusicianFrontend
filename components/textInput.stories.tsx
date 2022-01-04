import TextInput, { INPUT_TYPES } from './textInput';
import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Form/TextInput',
  component: TextInput,
} as Meta;

export const Text = () => {
  return <TextInput type="text" placeholder="write text here" />;
};

export const Number = () => {
  return <TextInput type="number" placeholder="Put number" />;
};
