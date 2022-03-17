import ProfileSection from './ProfileSection';
import Card from '../Card';

type Props = {
  children: JSX.Element;
};

export function ProfileGroup({ children }: Props) {
  return (
    <ProfileSection title="Mes Groupes">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{children}</div>
    </ProfileSection>
  );
}

export default ProfileGroup;
