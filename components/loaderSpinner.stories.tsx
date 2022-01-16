import loaderSpinner, { SPINNER_SIZE } from './loaderSpinner';
import { Meta } from '@storybook/react';

export default {
  title: 'Loader/Circle',
  component: loaderSpinner,
  argTypes: {
    size: {
      options: SPINNER_SIZE,
      control: { type: 'select' },
      defaultValue: 'sm',
    },
  },
} as Meta;

export { loaderSpinner };
