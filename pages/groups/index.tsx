import Header from '../../components/Header';
import { IGroup } from '../../components/icons';
import NewButton from '../../components/NewButton';
import Card from '../../components/Card';
import TagSmall from '..//../components/TagSmall';
import Banner from '../../components/Banner';
import { useState } from 'react';
import ContentLayout from '../../layout/content';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import { useAxios } from '../../context/AxiosContext';
import { Groups } from '../../types';
import { Filters } from '../../components/DataEntry';
import useSWR from 'swr';
import { FiltersType } from '../../components/DataEntry/Filters';

export default function GroupsPage(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { authAxios } = useAxios();

  const [filters, setFilters] = useState<FiltersType>({ params: {} });

  const { data: groupList } = useSWR<Groups[]>(
    ['/groups', filters],
    (url, filters) => authAxios.get(url, filters).then((res) => res.data),
  );

  return (
    <ContentLayout
      Header={
        <Header
          title="Groupes"
          subtitle="420 groupes"
          icon={<IGroup />}
          rightComponents={
            <NewButton label="Créer un groupe" className="rounded-full" />
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
        <Filters
          usedFilters={['genres', 'location', 'name']}
          setFilters={setFilters}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groupList &&
            groupList.map((group) => (
              <Card
                key={group.id}
                title={group.name}
                subtitle={`${group.members.length} membres · ${group.location}`}
                description={group.description}
                genres={group.genres.map((genre) => genre.name)}
                href={`/groups/${group.id}`}
                tagSmall={
                  <TagSmall
                    label="RJ"
                    description="Ce groupe recherche des musiciens"
                  />
                }
              />
            ))}
        </div>
      </>
    </ContentLayout>
  );
}
