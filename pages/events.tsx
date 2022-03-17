import Header from '../components/Header';
import { IPeople } from '../components/icons';
import NewButton from '../components/NewButton';
import Banner from '../components/Banner';
import ProfileSection from '../components/Profile/ProfileSection';
import ContentLayout from '../layout/content';
import { MenuContext } from '../context/MenuContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function Events(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const notifySuccess = () => toast.success('Wow so easy!');
  const notifyError = () => toast.error('Error');

  return (
    <ContentLayout
      Header={
        <Header
          title="Profil"
          icon={<IPeople />}
          rightComponents={
            <NewButton label="Modifier mon profil" className="rounded-full" />
          }
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      <>
        <Banner
          title="Trouve le"
          boldTitle="groupe parfait!"
          subtitle="Plus besoin de galérer pour trouver l'équipe parfaite"
          imagePath="/images/music_concert.png"
        />
        <ProfileSection title="A propos">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan tristique rutrum. Morbi sit amet diam ac lacus congue
            facilisis. Nunc eget est auctor, auctor sapien sed, porta augue.
          </p>
        </ProfileSection>
        <div>
          <button
            className="px-4 py-1 rounded border bg-gray-50"
            onClick={notifySuccess}
          >
            notif
          </button>
          <button
            className="px-4 py-1 rounded border bg-gray-50"
            onClick={notifyError}
          >
            error
          </button>
        </div>
      </>
    </ContentLayout>
  );
}
