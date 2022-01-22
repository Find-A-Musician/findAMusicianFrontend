import TextInput from './textInput';
import { Meta } from '@storybook/react';
import { ALL_ICONS, ICONS_DEFINITION } from '../utils/icons';
import { INPUT_TYPES } from './textInput';
export default {
  title: 'Form/TextInput',
  component: TextInput,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Write text here',
    },
    type: {
      defaultValue: 'text',
      control: {
        type: 'select',
        options: INPUT_TYPES,
      },
    },
    icon: {
      defaultValue: 'none',
      control: {
        type: 'select',
        options: ['none', ...Object.keys(ICONS_DEFINITION)],
      },
    },
    isFull: {
      type: 'boolean',
      defaultValue: false,
    },
    placeHolder: {
      type: 'string',
      defaultValue: 'write here',
    },
  },
} as Meta;

export const Primary = ({
  label,
  icon,
  type,
  isFull,
  placeHolder,
}: {
  label: string;
  icon: ALL_ICONS | 'none';
  type: typeof INPUT_TYPES[number];
  isFull: boolean;
  placeHolder: string;
}) => {
  return (
    <TextInput
      type={type}
      placeholder={placeHolder}
      label={label}
      id="text"
      icon={icon === 'none' ? undefined : icon}
      isFull={isFull}
    />
  );
};
