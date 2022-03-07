import { ITelescope, IPeople, IMusicNote, ICalendar } from './icons';
import NavItem from './NavItem';
import ProfileButton from './ProfileButton';

export default function Navbar() {
  return (
    <div className="flex flex-none flex-col items-center h-screen bg-gray-100 w-80">
      <span className="flex items-center gap-2 my-20 text-red-500 text-xl font-bold">
        <ITelescope /> Find a musician
      </span>
      <nav className="flex flex-col gap-8">
        <NavItem text="Musiciens" href="/musician">
          <IMusicNote />
        </NavItem>
        <NavItem text="Groupes" href="/groups">
          <IPeople />
        </NavItem>
        <NavItem text="Evènements" href="/events">
          <ICalendar />
        </NavItem>
      </nav>
      <ProfileButton className="mt-auto" />
    </div>
  );
}
