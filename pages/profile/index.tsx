import ContentLayout from '../../layout/content';
import Header from '../../components/Header';
import NewButton from '../../components/NewButton';
import { IPeople } from '../../components/icons';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import {
  DetailsGroup,
  DetailsInformation,
  DetailsBanner,
} from '../../components/Details';
import {
  NotificationGroupInvite,
  NotificationGroupKick,
} from '../../components/Notifications';
import { useAxios } from '../../context/AxiosContext';
import useSWR from 'swr';
import { Musician, Groups } from '../../types';
import Card from '../../components/Card';
import { DetailsAbout } from '../../components/Details';
import NotificationHandler from '../../components/Notifications/NotificationHandler';

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
          <DetailsBanner profil={profil} groups={groupList} isMyProfile />
          <NotificationHandler />
          <NotificationGroupInvite
            groupName="Columbine"
            instrument="chanteur"
            locations={['Douai', 'Lille']}
            description="Salut Alexandre, on cherche quelqu’un pour remplacer Foda ! Ca fait des mois qu’il ne donne plus aucun signe de vie... Si ça te tente vient rejoindre l’aventure Columbine avec nous."
          />
          <NotificationGroupKick groupName="Spiritbox" />
          <DetailsAbout profil={profil} canBeModified />
          <DetailsInformation
            promotion={profil.promotion}
            email={profil.email}
            localisation={profil.location}
            genres={profil.genres}
            instruments={profil.instruments}
            canBeModified
          />
          {groupList?.length && (
            <DetailsGroup>
              <>
                {groupList.map((group) => (
                  <Card
                    key={group.id}
                    title={group.name}
                    genres={group.genres.map((genre) => genre.name)}
                    isDisplayRole
                    musician={profil}
                    group={group}
                    href={`/groups/${group.id}`}
                  />
                ))}
              </>
            </DetailsGroup>
          )}
        </>
      ) : (
        <></>
      )}
    </ContentLayout>
  );
}
