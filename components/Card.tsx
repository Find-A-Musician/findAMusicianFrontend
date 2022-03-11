import Tag from './Tag';
import Link from 'next/link';
import { capitalize } from '../utils/string';

type Props = {
  title: string;
  description: string;
  genres: Array<string>;
  /**path to group page */
  href: string;
  subtitle?: string;
  smallTag?: JSX.Element;
  recherche?: Array<string>;
};

export default function Card({
  title,
  subtitle,
  description,
  genres,
  href,
  smallTag,
  recherche,
}: Props) {
  function format(arr: Array<string>): string {
    return arr.map((el) => capitalize(el)).join(', ');
  }
  return (
    <div className="flex flex-col border rounded-xl px-6 py-5">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 rounded-full bg-black"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <div>{smallTag}</div>
          </div>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      <p className="flex-grow text-gray-500 block py-4">{description}</p>
      {recherche && (
        <span className="text-gray-500 block pb-4">
          <span className="font-medium">Recherche : </span>
          {format(recherche)}
        </span>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 ">
          {genres.map((genre, index) => (
            <Tag key={index} text={genre} />
          ))}
        </div>
        <Link href={href} passHref>
          <a className="text-sm text-blue-500 hover:underline">Voir plus</a>
        </Link>
      </div>
    </div>
  );
}
