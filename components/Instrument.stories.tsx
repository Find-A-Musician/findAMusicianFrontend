import Instruments from './Instrument';
import { Meta } from '@storybook/react';
import { INSTRUMENTS_NAME_LIST } from '../types/api';

export default {
  title: 'Musician/Instruments',
  component: Instruments,
  argTypes: {
    instrument: {
      defaultValue: INSTRUMENTS_NAME_LIST[0],
      control: {
        type: 'select',
        options: INSTRUMENTS_NAME_LIST,
      },
    },
  },
} as Meta;

export { Instruments };
