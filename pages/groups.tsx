import Header from '../components/Header';
import { IGroup } from '../components/icons';
import NewButton from '../components/NewButton';
import Banner from '../components/Banner';

export default function Groups(): JSX.Element {
  return (
    <div className="flex flex-col gap-10">
      <Header
        title="Groupes"
        subtitle="420 groupes"
        icon={<IGroup />}
        rightComponents={<NewButton label="Créer un groupe" />}
      />
      <Banner
        title="Trouve le"
        boldTitle="groupe parfait!"
        subtitle="Plus besoin de galérer pour trouver l'équipe parfaite"
        imagePath="/images/music_concert.png"
      />
    </div>
  );
}
