import Header from '../components/Header';
import { IGroup } from '../components/icons';
import NewButton from '../components/NewButton';
import GroupCard from '../components/GroupCard';

export default function Groups(): JSX.Element {
  return (
    <div>
      <Header
        title="Groupes"
        subtitle="420 groupes"
        icon={<IGroup />}
        rightComponents={<NewButton label="Créer un groupe" />}
      />
      <GroupCard
        title="Singe"
        subtitle="4 membres"
        description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
        genres={['pop', 'rock', 'rock']}
        href="/musician"
      />
    </div>
  );
}
