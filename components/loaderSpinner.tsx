export const SPINNER_SIZE = ['xs', 'sm', 'lg', 'xl', '2xl'] as const;

type Size = typeof SPINNER_SIZE[number];

export default function LoaderSpinner({ size }: { size: Size }): JSX.Element {
  return (
    <div
      className={`${getSize(
        size,
      )} rounded-full border-4 border-gray-200 border-t-red-700 animate-spin`}
    ></div>
  );
}

function getSize(size: Size) {
  switch (size) {
    case 'xs':
      return 'w-5 h-5';
    case 'sm':
      return 'w-8 h-8';
    case 'lg':
      return 'w-10 h-10';
    case 'xl':
      return 'w-20 h-20';
    case '2xl':
      return 'w-52 h-52';
  }
}
