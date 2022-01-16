import { Meta } from '@storybook/react';
import AppLayout from './app';

export default {
  title: 'Layout/App',
  component: AppLayout,
  parameters: {
    nextRouter: {
      pathname: '/musician',
    },
  },
} as Meta;

export { AppLayout };
