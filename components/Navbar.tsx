import { ITelescope, IGroup, IMusicNote, ILogout, ICalendar } from './icons';
import NavItem from './NavItem';
import ProfileButton from './Profile/ProfileButton';
import { Logout } from '../layout/app';
import { useAxios } from '../context/AxiosContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { push } = useRouter();
  const { authAxios } = useAxios();
  const { setAuthState } = useAuth();

  return (
    <div className="flex flex-none flex-col items-center h-screen bg-gray-100 w-80">
      <div>
        <span className="flex items-center gap-2 my-[4.5rem] text-red-500 text-xl font-bold">
          <ITelescope /> Find a musician
        </span>
        <nav className="flex flex-col gap-8">
          <NavItem text="Musiciens" href="/musician" icon={<IMusicNote />} />
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
      <ProfileButton className="mt-auto" />
    </div>
  );
}
