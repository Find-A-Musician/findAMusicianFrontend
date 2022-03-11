import ProfileSection from './ProfileSection';
import Card from '../Card';

export function ProfileGroup() {
  return (
    <ProfileSection title="Mes Groupes">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title="Singe"
          subtitle="4 membres"
          genres={['pop', 'rock', 'rock']}
          href="/musician"
        />
        <Card
          title="Singe"
          subtitle="4 membres"
          genres={['pop', 'rock', 'rock']}
          href="/musician"
        />
        <Card
          title="Singe"
          subtitle="4 membres"
          genres={['pop', 'rock', 'rock']}
          href="/musician"
        />
      </div>
    </ProfileSection>
  );
}

export default ProfileGroup;
