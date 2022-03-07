import StatsInfo from './StatsInfo';
import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Miscellaneous/StatsInfo',
  component: StatsInfo,
  argTypes: {
    number: {
      type: 'number',
      defaultValue: 999,
    },
    label: {
      type: 'string',
      defaultValue: 'musiciens inscrits',
    },
  },
} as Meta;

export const withNumber = (props: ComponentProps<typeof StatsInfo>) => {
  return <StatsInfo {...props} />;
};

export const loading = (props: ComponentProps<typeof StatsInfo>) => {
  return <StatsInfo {...props} number={null} />;
};
