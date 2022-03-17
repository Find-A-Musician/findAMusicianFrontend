import SelectGenre from '../SelectGenre';
import { Meta } from '@storybook/react';
import { GENRE_NAME_LIST } from '../../types/api';
import { useState } from 'react';
import { Genre } from '../../types';

export default {
  title: 'Form/SelectGenre',
  component: SelectGenre,
} as Meta;

export const GenreSelect = () => {
  const genresList: Genre[] = GENRE_NAME_LIST.map((item, index) => {
    return { id: `genre-${index}`, name: item };
  });

  const [selectedGenre, setSelectedGenre] = useState<Genre[]>(
    genresList.slice(0, 2),
  );

  return (
    <div className="w-full flex justify-around">
      <div className="w-1/3">
        <SelectGenre
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genresList}
        />
      </div>
      <p className="w-20">{JSON.stringify(selectedGenre)}</p>
    </div>
  );
};

export const Loading = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre[]>([]);

  return (
    <div className="w-full">
      <div className="w-1/3">
        <SelectGenre
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={undefined}
        />
      </div>
    </div>
  );
};
