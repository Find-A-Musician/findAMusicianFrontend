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
import { useAxios } from '../../context/AxiosContext';
import useSWR from 'swr';
import { Musician, Groups } from '../../types';
import Card from '../../components/Card';

export default function MyProfile() {
  const { getProfil } = useAuth();
  const { authAxios } = useAxios();
  const profil = getProfil();

  const { data: loggedInUser } = useSWR<Musician>('/profil', (url) =>
    authAxios.get(url).then((res) => res.data),
  );

  const { data: groupList } = useSWR<Groups[]>(
    () => '/groups',
    (url) =>
      authAxios
        .get(url)
        .then((res) => res.data)
        .then((res) =>
          res.filter((group: Groups) =>
            JSON.stringify(group.members).includes(loggedInUser!.id),
          ),
        ),
  );

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
      {profil ? (
        <>
          <ProfileBanner
            firstname={profil.givenName}
            lastname={profil.familyName}
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
            promotion={profil.promotion}
            email={profil.email}
            localisation={profil.location}
            genres={profil.genres}
            instruments={profil.instruments}
          />
          {!!groupList?.length && (
            <ProfileGroup>
              <>
                {groupList.map((group) => (
                  <Card
                    key={group.id}
                    title={group.name}
                    genres={group.genres.map((genre) => genre.name)}
                    href={`/groups/${group.id}`}
                  />
                ))}
              </>
            </ProfileGroup>
          )}
        </>
      ) : (
        <></>
      )}
    </ContentLayout>
  );
}
