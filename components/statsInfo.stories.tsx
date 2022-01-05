import StatsInfo from './statsInfo';
import { Meta } from '@storybook/react';

export default {
  title: 'Miscellaneous/StatsInfo',
  component: StatsInfo,
} as Meta;

export const withNumber = () => {
  return <StatsInfo label="musiciens inscrits" number={999} />;
};

export const loading = () => {
  return <StatsInfo label="musiciens inscrits" number={null} />;
};
