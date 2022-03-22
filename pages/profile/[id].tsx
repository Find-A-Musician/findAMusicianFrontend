import ContentLayout from '../../layout/content';
import {
  DetailsBanner,
  DetailsAbout,
  DetailsInformation,
  DetailsGroup,
} from '../../components/Details';
import Header from '../../components/Header';
import { IPeople } from '../../components/icons';
import useSwr from 'swr';
import { useAxios } from '../../context/AxiosContext';
import { useRouter } from 'next/router';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import useSWR from 'swr';
import { Groups } from '../../types';
import Card from '../../components/Card';

export default function Profile() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const router = useRouter();
  const { id } = router.query;
  const { authAxios } = useAxios();

  const { data: groupList } = useSWR<Groups[]>('/groups', (url) =>
    authAxios
      .get(url)
      .then((res) => res.data)
      .then((res) => {
        if (id)
          return res.results.filter((group: Groups) =>
            JSON.stringify(group.members).includes(id as string),
          );
        return res;
      }),
  );

  const { data: profil } = useSwr(`/musicians/${id}`, (url) =>
    authAxios.get(url).then(({ data }) => data),
  );

  return (
    <ContentLayout
      Header={
        <Header
          title="Profil"
          icon={<IPeople />}
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      {profil && (
        <>
          <DetailsBanner profil={profil} groups={groupList} />
          {profil.description && <DetailsAbout profil={profil} />}
          <DetailsInformation
            promotion={profil.promotion}
            email={profil.email}
            localisation={profil.location}
            genres={profil.genres}
            instruments={profil.instruments}
          />
          {!!groupList?.length && (
            <DetailsGroup>
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
            </DetailsGroup>
          )}
        </>
      )}
    </ContentLayout>
  );
}
