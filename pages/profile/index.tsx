import ContentLayout from '../../layout/content';
import Header from '../../components/Header';
import NewButton from '../../components/NewButton';
import { IPeople } from '../../components/icons';
import { useAuth } from '../../context/AuthContext';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import {
  ProfileGroup,
  ProfileSection,
  ProfileInformation,
  ProfileBanner,
} from '../../components/Profile';

export default function MyProfile() {
  const { getProfil } = useAuth();
  const profil = getProfil();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

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
        <ProfileBanner
          firstname={profil!.givenName}
          lastname={profil!.familyName}
          isMyProfile
        />
        <ProfileSection title="A propos">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan tristique rutrum. Morbi sit amet diam ac lacus congue
            facilisis. Nunc eget est auctor, auctor sapien sed, porta augue.
          </p>
        </ProfileSection>
        <ProfileInformation
          promotion={profil!.promotion}
          email={profil!.email}
          localisation={profil!.location}
          genres={profil!.genres}
          instruments={profil!.instruments}
        />
        <ProfileGroup />
      </>
    </ContentLayout>
  );
}
