import Header from '../components/Header';
import { IGroup } from '../components/icons';
import NewButton from '../components/NewButton';

export default function Groups(): JSX.Element {
  return (
    <div>
      <Header
        title="Groupes"
        subtitle="420 groupes"
        icon={<IGroup />}
        rightComponents={<NewButton label="Créer un groupe" />}
      />
    </div>
  );
}
