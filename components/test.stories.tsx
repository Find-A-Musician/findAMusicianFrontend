import Test from './test';
import { Meta, Story } from '@storybook/react';
import React from 'react';

export default {
  title: 'Test',
  component: Test,
  argTypes: {
    text: {
      control: { type: 'text' },
      defaultValue: 'hello world',
    },
  },
} as Meta;

export { Test };
