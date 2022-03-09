import ContentLayout from '../../layout/content';
import ProfileSection from '../../components/Profile/ProfileSection';
import ProfileInformation from '../../components/Profile/ProfileInformation';
import ProfileBanner from '../../components/Profile/ProfileBanner';
import Header from '../../components/Header';
import NewButton from '../../components/NewButton';
import { IPeople } from '../../components/icons';
import useSwr from 'swr';
import { useAxios } from '../../context/AxiosContext';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { authAxios } = useAxios();

  const { data } = useSwr(`/musicians/${id}`, (url) =>
    authAxios.get(url).then(({ data }) => data),
  );

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
      {data && (
        <>
          <ProfileBanner
            firstname={data.givenName}
            lastname={data.familyName}
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
      )}
    </ContentLayout>
  );
}
