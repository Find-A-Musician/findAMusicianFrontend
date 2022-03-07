import { GENRE_NAME } from '../types/api';

export default function GenreLabel({ genre }: { genre: GENRE_NAME }) {
  return (
    <div
      className={`${getGenreColor(
        genre,
      )} inline-flex px-4 h-7  justify-center items-center text-white rounded-3xl mr-2`}
    >
      {genre}
    </div>
  );
}

function getGenreColor(genre: GENRE_NAME) {
  switch (genre) {
    case 'Metal':
      return 'bg-red-700';
    case 'Jazz':
      return 'bg-amber-400';
    case 'Rock':
      return 'bg-cyan-400';
    case 'Electro':
      return 'bg-pink-600';
    case 'Pop':
      return 'bg-orange-500';
    case 'Reggae':
      return 'bg-green-600';
  }
}
