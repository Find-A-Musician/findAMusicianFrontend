import Instruments, { INSTRUMENTS } from './instrument';
import { Meta } from '@storybook/react';

export default {
  title: 'Musician/Instruments',
  component: Instruments,
  argTypes: {
    instrument: {
      defaultValue: INSTRUMENTS[0],
      control: {
        type: 'select',
        options: INSTRUMENTS,
      },
    },
  },
} as Meta;

export { Instruments };
