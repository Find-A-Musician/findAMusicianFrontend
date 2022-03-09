import ContentLayout from '../layout/content';
import ProfileSection from '../components/Profile/ProfileSection';
import ProfileInformation from '../components/Profile/ProfileInformation';
import ProfileBanner from '../components/Profile/ProfileBanner';
import Header from '../components/Header';
import NewButton from '../components/NewButton';
import { IPeople } from '../components/icons';

export default function Profile() {
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
        <ProfileBanner />
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