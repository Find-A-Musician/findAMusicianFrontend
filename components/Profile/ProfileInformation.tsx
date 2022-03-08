import ProfileSection from './ProfileSection';
import { useAuth } from '../../context/AuthContext';
import { Instrument, Genre } from '../../types/api';
import { capitalize } from '../../utils/string';

function Info({ title, value }: { title: string; value: string }): JSX.Element {
  return (
    <div>
      <span className="block">{title}</span>
      <span className="text-black block">{value}</span>
    </div>
  );
}

export default function ProfileInformation() {
  const { getProfil } = useAuth();
  const profil = getProfil();

  function format(arr: Instrument[] | Genre[]): string {
    return arr.map((el) => capitalize(el.name)).join(', ');
  }

  return (
    <ProfileSection title="Information">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <Info title="Promotion" value={profil!.promotion} />
          <Info title="Promotion" value={format(profil!.instruments)} />
        </div>
        <div className="flex flex-col gap-4">
          <Info title="Promotion" value={profil!.location} />
          <Info title="Promotion" value={format(profil!.genres)} />
        </div>
        <Info title="Promotion" value={profil!.email} />
      </div>
    </ProfileSection>
  );
}
