import TextInput, { INPUT_TYPES } from './textInput';
import { Meta } from '@storybook/react';
import { ALL_ICONS, ICONS_DEFINITION } from '../utils/icons';
export default {
  title: 'Form/TextInput',
  component: TextInput,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Write text here',
    },
    icon: {
      control: {
        type: 'select',
        options: ['none', ...Object.keys(ICONS_DEFINITION)],
        defaultValue: 'facebook',
      },
    },
  },
} as Meta;

export const Text = ({
  label,
  icon,
}: {
  label: string;
  icon: ALL_ICONS | 'none';
}) => {
  if (icon === 'none') {
    return (
      <TextInput type="text" placeholder="write text" label={label} id="text" />
    );
  } else {
    return (
      <TextInput
        type="text"
        placeholder="write text"
        label={label}
        id="text"
        icon={icon}
      />
    );
  }
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
