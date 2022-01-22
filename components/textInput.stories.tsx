import TextInput, { INPUT_TYPES } from './textInput';
import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Form/TextInput',
  component: TextInput,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Write text here',
    },
  },
} as Meta;

export const Text = ({ label }: { label: string }) => {
  return (
    <TextInput
      type="text"
      placeholder="write text here"
      label={label}
      id="text"
    />
  );
};

export const Number = ({ label }: { label: string }) => {
  return (
    <TextInput
      type="number"
      placeholder="Put number"
      label={label}
      id="number"
    />
  );
};

export const Search = ({ label }: { label: string }) => {
  return (
    <TextInput
      type="search"
      placeholder="Find a musician"
      label={label}
      id="search"
    />
  );
};
