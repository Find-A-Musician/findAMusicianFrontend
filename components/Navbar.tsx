import { ITelescope, IGroup, IMusicNote, ILogout, ICalendar } from './icons';
import NavItem from './NavItem';
import DetailsButton from './Details/DetailsButton';
import { Logout } from '../layout/app';
import { useAxios } from '../context/AxiosContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export default function Navbar({ setIsMenuOpen, className }: Props) {
  const { push } = useRouter();
  const { authAxios } = useAxios();
  const { setAuthState } = useAuth();

  return (
    <div
      className={`flex flex-none flex-col items-center h-screen bg-gray-100 ${className}`}
    >
      <div>
        <Link href="/musicians" passHref>
          <a
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 my-[4.5rem] text-red-500 text-xl font-bold"
          >
            <ITelescope /> Find a musician
          </a>
        </Link>
        <nav
          onClick={() => setIsMenuOpen(false)}
          className="flex flex-col gap-8"
        >
          <NavItem text="Musiciens" href="/musicians" icon={<IMusicNote />} />
          <NavItem text="Groupes" href="/groups" icon={<IGroup />} />
          <NavItem text="Evènements" href="/events" icon={<ICalendar />} />
          <div className="mt-8">
            <NavItem
              text="Se déconnecter"
              onClick={() => {
                Logout(authAxios, setAuthState, push);
                close();
              }}
              href="/login"
              icon={<ILogout />}
            />
          </div>
        </nav>
      </div>
      <DetailsButton className="mt-auto" onClick={() => setIsMenuOpen(false)} />
    </div>
  );
}
