import Header from '../components/Header';
import { IPeople } from '../components/icons';
import NewButton from '../components/NewButton';
import Banner from '../components/Banner';
import ProfileSection from '../components/ProfileSection';

export default function Events(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <Header
          title="Profil"
          icon={<IPeople />}
          rightComponents={<NewButton label="Modifier mon profil" />}
        />
        <Banner
          title="Trouve le"
          boldTitle="groupe parfait!"
          subtitle="Plus besoin de galérer pour trouver l'équipe parfaite"
          imagePath="/images/music_concert.png"
        />
        <ProfileSection>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan tristique rutrum. Morbi sit amet diam ac lacus congue
            facilisis. Nunc eget est auctor, auctor sapien sed, porta augue.
          </p>
        </ProfileSection>
      </div>
    </div>
  );
}
