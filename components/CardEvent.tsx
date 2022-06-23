import Tag from './Tag';
import Link from 'next/link';

type Props = {
  title: string;
  subtitle: string;
  nbParticipants: number;
  month: string;
  day: string;
  description: string;
  genres: Array<string>;
  /**path to event page */
  href: string;
};

export default function CardEvent({
  title,
  subtitle,
  nbParticipants,
  month,
  day,
  description,
  genres,
  href,
}: Props) {
  return (
    <div className="flex p-2 border rounded gap-1">
      <div className="h-auto w-32 bg-black"></div>
      <div className="grow">
        <div className="flex gap-2">
          <div className="h-20 w-20 bg-red-500 flex flex-col items-center justify-center">
            <span className="text-xl text-red-100">{month}</span>
            <span className="text-3xl text-white block">{day}</span>
          </div>
          <div>
            <span className="text-xl font-bold">{title}</span>
            <span className="block text-sm italic">{subtitle}</span>
            <span className="block text-sm italic">
              {nbParticipants} participant{nbParticipants > 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <span>{description}</span>
        <div className="w-full mt-auto flex items-center justify-between">
          <div className="w-full flex-wrap flex-grow flex gap-1.5 ">
            {genres.map((genre, index) => (
              <Tag key={index} text={genre} />
            ))}
          </div>
          <div className="flex-none pl-2">
            <Link href={href} passHref>
              <a className="text-sm text-blue-500 hover:underline">Voir plus</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
