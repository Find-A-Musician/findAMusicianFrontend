import Button from './Button';
import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Click Me',
    },
    bold: {
      type: 'boolean',
      defaultValue: false,
    },
    onClick: {
      action: 'Clicked',
    },
    isLarge: {
      type: 'boolean',
      defaultValue: false,
    },
  },
} as Meta;

export const Filled = (props: ComponentProps<typeof Button>) => (
  <Button {...props} layout="filled" />
);

export const Bordered = (props: ComponentProps<typeof Button>) => (
  <Button {...props} layout="bordered" />
);
