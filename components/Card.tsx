import Tag from './Tag';
import Link from 'next/link';
import { capitalize } from '../utils/string';
import TagSmall from './TagSmall';
import { useGroup } from '../api';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  genres: Array<string>;
  /**path to group page */
  href: string;
  description?: string;
  subtitle?: string;
  tagSmall?: JSX.Element;
  recherche?: Array<string>;
  musicianID?: string;
  groupID?: string;
  /**If you want the roles to be displayed you also need to precise musicianID and groupID */
  isDisplayRole?: boolean;
};

export default function Card({
  title,
  genres,
  href,
  description,
  subtitle,
  tagSmall,
  recherche,
  musicianID,
  groupID,
  isDisplayRole,
}: Props) {
  function format(arr: Array<string>): string {
    return arr.map((el) => capitalize(el)).join(', ');
  }

  const { getMembership } = useGroup();
  const [membership, setMembership] = useState('');

  useEffect(() => {
    if (isDisplayRole && musicianID && groupID) {
      getMembership(musicianID, groupID).then((res) => {
        if (res) setMembership(res.membership);
      });
    }
  }, [getMembership, groupID, isDisplayRole, musicianID]);

  return (
    <div className="flex flex-col border rounded-xl px-6 py-5">
      <div
        className={`flex items-center gap-3 pb-4 ${
          description ? 'border-b' : ''
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-black"></div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-black">{title}</span>
            <div className="flex items-center gap-2">
              {tagSmall}
              {isDisplayRole && membership === 'admin' && (
                <TagSmall label="owner" description="Créateur du groupe" />
              )}
              {isDisplayRole && membership === 'lite_admin' && (
                <TagSmall label="admin" description="Admin du groupe" />
              )}
              {isDisplayRole && membership === 'member' && (
                <TagSmall label="member" description="Appartient au groupe" />
              )}
            </div>
          </div>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      {description && (
        <p className="flex-grow max-h-[6rem] mb-2 text-ellipsis overflow-hidden text-gray-500 block py-4">
          {description}
        </p>
      )}
      {recherche && (
        <span className="text-gray-500 block pb-4">
          <span className="font-medium">Recherche : </span>
          {format(recherche)}
        </span>
      )}
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
  );
}
