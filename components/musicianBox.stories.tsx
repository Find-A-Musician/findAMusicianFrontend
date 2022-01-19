import MusicianBox from './musicianBox';
import MusicianBoxSqueleton from './musicianBoxSqueleton';
import { Meta } from '@storybook/react';
import { GENRE_LABEL } from './genreLabel';
import { Component, ComponentProps } from 'react';
import { INSTRUMENTS } from './instrument';

const genresList = GENRE_LABEL.map((item, index) => {
  return { id: `genre-${index}`, name: item };
});

const instrumentsList = INSTRUMENTS.map((item, index) => {
  return { id: `instrument-${index}`, name: item };
});

export default {
  title: 'Musician/MusicianBox',
  component: MusicianBox,
  argTypes: {
    name: {
      type: 'string',
      defaultValue: 'Romain Guarinoni',
    },
    nbGenre: {
      defaultValue: 3,
      control: {
        type: 'range',
        min: 0,
        max: genresList.length,
      },
    },
    nbInstruments: {
      defaultValue: 3,
      control: {
        type: 'range',
        min: 0,
        max: instrumentsList.length,
      },
    },
    email: {
      type: 'string',
      defaultValue: 'romain.guar91@gmail.com',
    },
    facebook_url: {
      type: 'string',
    },
    twitter_url: {
      type: 'string',
    },
    instagram_url: {
      type: 'string',
    },
  },
} as Meta;

export const Primary = ({
  nbGenre,
  nbInstruments,
  name,
  email,
  facebook_url,
  twitter_url,
  instagram_url,
}: {
  nbGenre: number;
  nbInstruments: number;
  name: string;
  email: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
}) => {
  return (
    <MusicianBox
      name={name}
      email={email}
      facebook_url={facebook_url}
      twitter_url={twitter_url}
      instagram_url={instagram_url}
      genres={genresList.slice(0, nbGenre)}
      instruments={instrumentsList.slice(0, nbInstruments)}
    />
  );
};

export const Squelator = () => {
  return <MusicianBoxSqueleton />;
};
