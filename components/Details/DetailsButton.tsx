import { IChevronBottom, IChevronTop } from '../icons';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

type Props = {
  onClick?: () => void;
  className?: string;
};

export function DetailsButton({ onClick, className }: Props) {
  const { getProfil } = useAuth();
  const profil = getProfil();

  return (
    <Link href="/profile" passHref>
      <a
        onClick={onClick}
        className={`flex justify-around items-center px-7 h-28 w-full ${className}`}
      >
        <div className="w-14 h-14 rounded-full bg-blue-500"></div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">
            {profil?.givenName} {profil?.familyName}
          </span>
          <span className="text-gray-500">{profil?.instruments[0]?.name}</span>
        </div>
        <div className="flex flex-col text-gray-500">
          <span className="-mb-2">
            <IChevronTop />
          </span>
          <IChevronBottom />
        </div>
      </a>
    </Link>
  );
}

export default DetailsButton;
