import Header from '../../components/Header';
import { IGroup } from '../../components/icons';
import NewButton from '../../components/NewButton';
import Card from '../../components/Card';
import TagSmall from '..//../components/TagSmall';
import Banner from '../../components/Banner';
import { useEffect, useRef, useState } from 'react';
import ContentLayout from '../../layout/content';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import { Filters } from '../../components/DataEntry';
import { FiltersType } from '../../components/DataEntry/Filters';
import { useGetProfil, useGroup } from '../../api';
import useOnScreen from '../../hooks/useOnScreen';
import { useRouter } from 'next/router';

export default function GroupsPage(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { useGetGroups } = useGroup();

  const [filters, setFilters] = useState<FiltersType>({ params: {} });
  const { data: groupList, size, setSize } = useGetGroups(filters);
  const { data: profil } = useGetProfil();

  const bottomRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(bottomRef);

  useEffect(() => {
    if (groupList?.length) setSize(size + 1);
  }, [isIntersecting]);

  const router = useRouter();

  return (
    <ContentLayout
      Header={
        <Header
          title="Groupes"
          subtitle={`${groupList?.length} groupes`}
          icon={<IGroup />}
          rightComponents={
            <NewButton
              label="Créer un groupe"
              className="rounded-full"
              onClick={() => router.push('/groups/create')}
            />
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
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          data-cy="group-list"
        >
          {groupList &&
            profil &&
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
        <div ref={bottomRef} className="h-4"></div>
      </>
    </ContentLayout>
  );
}
