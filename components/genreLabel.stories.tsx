import GenreLabel from './genreLabel';
import { Meta } from '@storybook/react';
import { GENRE_LABEL } from './genreLabel';

export default {
  title: 'Musician/genreLabel',
  component: GenreLabel,
  argTypes: {
    genre: {
      options: GENRE_LABEL,
      control: { type: 'select' },
      defaultValue: 'Rock',
    },
  },
} as Meta;

export { GenreLabel };
