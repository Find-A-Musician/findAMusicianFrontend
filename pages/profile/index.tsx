import ContentLayout from '../../layout/content';
import ProfileSection from '../../components/Profile/ProfileSection';
import ProfileInformation from '../../components/Profile/ProfileInformation';
import ProfileBanner from '../../components/Profile/ProfileBanner';
import Header from '../../components/Header';
import NewButton from '../../components/NewButton';
import { IPeople } from '../../components/icons';
import { useAuth } from '../../context/AuthContext';

export default function MyProfile() {
  const { getProfil } = useAuth();
  const profil = getProfil();

  return (
    <ContentLayout
      Header={
        <Header
          title="Profil"
          icon={<IPeople />}
          rightComponents={<NewButton label="Modifier mon profil" />}
        />
      }
    >
      <>
        <ProfileBanner
          firstname={profil!.givenName}
          lastname={profil!.familyName}
        />
        <ProfileSection title="A propos">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            accumsan tristique rutrum. Morbi sit amet diam ac lacus congue
            facilisis. Nunc eget est auctor, auctor sapien sed, porta augue.
          </p>
        </ProfileSection>
        <ProfileInformation />
      </>
    </ContentLayout>
  );
}
