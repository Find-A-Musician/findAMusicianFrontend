import { Meta } from '@storybook/react';
import AppLayout from './app';

export default {
  title: 'Layout/App',
  component: AppLayout,
  parameters: {
    nextRouter: {
      pathname: '/musicians',
    },
  },
} as Meta;

export { AppLayout };
