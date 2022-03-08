import Tag from '../components/Tag';
import Link from 'next/link';

type Props = {
  name: string;
  nbMembers: number;
  description: string;
  genres: Array<string>;
  /**path to group page */
  href: string;
};

export default function GroupCard({
  name,
  nbMembers,
  description,
  genres,
  href,
}: Props) {
  return (
    <div className="border rounded-xl px-6 py-5">
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 rounded-full bg-black"></div>
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-sm text-gray-500">
            {nbMembers} membre{nbMembers > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <span className="text-gray-500 block py-4">{description}</span>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 ">
          {genres.map((genre, index) => (
            <Tag key={index} text={genre} />
          ))}
        </div>
        <Link href={href} passHref>
          <a className="text-sm text-blue-500">Voir plus</a>
        </Link>
      </div>
    </div>
  );
}
