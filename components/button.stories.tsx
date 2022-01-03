import Button from './button';
import { Meta, Story } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Click Me',
    },
    layout: {
      control: { type: 'select' },
      options: ['filled', 'bordered'],
      defaultValue: 'filled',
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

export { Button };
