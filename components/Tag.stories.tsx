import Tag from './Tag';
import { Meta } from '@storybook/react';

export default {
  title: 'Miscellaneous/Tag',
  component: Tag,
  argTypes: {
    text: {
      type: 'string',
      defaultValue: 'Pop',
    },
  },
} as Meta;

export { Tag };
