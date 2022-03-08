import { ITelescope, IGroup, IMusicNote, ICalendar } from './icons';
import NavItem from './NavItem';
import ProfileButton from './Profile/ProfileButton';

export default function Navbar() {
  return (
    <div className="flex flex-none flex-col items-center h-screen bg-gray-100 w-80">
      <span className="flex items-center gap-2 my-[4.5rem] text-red-500 text-xl font-bold">
        <ITelescope /> Find a musician
      </span>
      <nav className="flex flex-col gap-8">
        <NavItem text="Musiciens" href="/musician" icon={<IMusicNote />} />
        <NavItem text="Groupes" href="/groups" icon={<IGroup />} />
        <NavItem text="Evènements" href="/events" icon={<ICalendar />} />
      </nav>
      <ProfileButton className="mt-auto" />
    </div>
  );
}
