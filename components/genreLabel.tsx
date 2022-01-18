export const GENRE_LABEL = [
  'Metal',
  'Rock',
  'Jazz',
  'Electro',
  'Pop',
  'Reggae',
] as const;

type Genre = typeof GENRE_LABEL[number];

export default function GenreLabel({ genre }: { genre: Genre }) {
  return (
    <div
      className={`${getGenreColor(
        genre,
      )} inline-flex px-4 h-8  justify-center items-center text-white rounded-3xl`}
    >
      {genre}
    </div>
  );
}

function getGenreColor(genre: Genre) {
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
