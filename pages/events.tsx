import Header from '../components/Header';
import { IPeople } from '../components/icons';
import NewButton from '../components/NewButton';
import Banner from '../components/Banner';
import CardEvent from '../components/CardEvent';
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
          title="Événements"
          subtitle="420 groupes"
          icon={<IPeople />}
          rightComponents={
            <NewButton label="Créer un événement" className="rounded-full" />
          }
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      <>
        <Banner
          title="Participe à"
          boldTitle="des événements !"
          subtitle="Participe aux événements les plys hype du moment"
          imagePath="/images/music_concert.png"
        />
        <CardEvent
          title="La pioche festival"
          subtitle="du Samedi au Lundi à Faches-Thumesnil"
          nbParticipants={45}
          month="Avril"
          day="02"
          description="Piocheuse, Piocheur, Là où les le jour s'endort, l'obscurité s'installe. Entre pierres et projecteurs, l'antre de la mine entame"
          genres={['Pop', 'Rock']}
          href={`/groups`}
        />
        <CardEvent
          title="La pioche festival"
          subtitle="du Samedi au Lundi à Faches-Thumesnil"
          nbParticipants={1}
          month="Avril"
          day="02"
          description=" Piocheuse, Piocheur, Là où les le jour s'endort, l'obscurité s'installe. Entre pierres et projecteurs, l'antre de la mine entame"
          genres={['Pop', 'Rock']}
          href={`/groups`}
        />
      </>
    </ContentLayout>
  );
}
