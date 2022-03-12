import ProfileSection from './ProfileSection';
import { useAuth } from '../../context/AuthContext';
import { Instrument, Genre } from '../../types';
import { capitalize } from '../../utils/string';

type Props = {
  promotion: string;
  localisation: string;
  email: string;
  genres: Genre[];
  instruments: Instrument[];
};

function Info({ title, value }: { title: string; value: string }): JSX.Element {
  return (
    <div>
      <span className="block">{title}</span>
      <span className="text-black block">{value}</span>
    </div>
  );
}

export function ProfileInformation({
  promotion,
  localisation,
  email,
  genres,
  instruments,
}: Props) {
  function format(arr: Instrument[] | Genre[]): string {
    return arr.map((el) => capitalize(el.name)).join(', ');
  }

  return (
    <ProfileSection title="Information">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Info title="Promotion" value={promotion} />
        <Info title="Localisation" value={localisation} />
        <Info title="Email" value={email} />
        <Info title="Instruments" value={format(instruments)} />
        <Info title="Genres" value={format(genres)} />
      </div>
    </ProfileSection>
  );
}

export default ProfileInformation;
