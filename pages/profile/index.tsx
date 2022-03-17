import ContentLayout from '../../layout/content';
import Header from '../../components/Header';
import NewButton from '../../components/NewButton';
import { IPeople } from '../../components/icons';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import {
  ProfileGroup,
  ProfileInformation,
  ProfileBanner,
  ProfileGroupInvite,
} from '../../components/Profile';
import { useAxios } from '../../context/AxiosContext';
import useSWR from 'swr';
import { Musician, Groups } from '../../types';
import Card from '../../components/Card';
import { ProfileAbout } from '../../components/Profile';

export default function MyProfile() {
  const { authAxios } = useAxios();

  const { data: profil } = useSWR<Musician>('/profil', (url) =>
    authAxios.get(url).then((res) => res.data),
  );

  const { data: groupList } = useSWR<Groups[]>(
    profil ? '/groups' : null,
    (url) =>
      authAxios
        .get(url)
        .then((res) => res.data)
        .then((res) =>
          res.results.filter((group: Groups) =>
            JSON.stringify(group.members).includes(profil!.id),
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
          <ProfileBanner profil={profil} groups={groupList} isMyProfile />
          <ProfileGroupInvite
            groupName="Columbine"
            instrument="chanteur"
            locations={['Douai', 'Lille']}
            description="Salut Alexandre, on cherche quelqu’un pour remplacer Foda ! Ca fait des mois qu’il ne donne plus aucun signe de vie... Si ça te tente vient rejoindre l’aventure Columbine avec nous."
          />
          <ProfileAbout profil={profil} canBeModified />
          <ProfileInformation
            promotion={profil.promotion}
            email={profil.email}
            localisation={profil.location}
            genres={profil.genres}
            instruments={profil.instruments}
            canBeModified
          />
          {groupList?.length && (
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
