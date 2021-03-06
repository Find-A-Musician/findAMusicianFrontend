import { IGroup } from '../components/icons';
import { Filters } from '../components/DataEntry';
import ContentLayout from '../layout/content';
import Header from '../components/Header';
import { MenuContext } from '../context/MenuContext';
import { useContext, useEffect, useRef, useState } from 'react';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { FiltersType } from '../components/DataEntry/Filters';
import TagSmall from '../components/TagSmall';
import { useGetMusicians } from '../api';
import useOnScreen from '../hooks/useOnScreen';

export function Musicians(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  const [filters, setFilters] = useState<FiltersType>({ params: {} });

  const { data: musiciansList, size, setSize } = useGetMusicians(filters);

  const bottomRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useOnScreen(bottomRef);

  useEffect(() => {
    if (musiciansList?.length) setSize(size + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return (
    <ContentLayout
      Header={
        <Header
          title="Musiciens"
          subtitle={`${musiciansList ? musiciansList.length : '...'} musiciens`}
          icon={<IGroup />}
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      <>
        <Banner
          title="Trouve lae"
          boldTitle="musicien⸱ne parfait⸱e !"
          subtitle="Plus besoin de galérer pour trouver lae musicien⸱ne parfait⸱e"
          imagePath="/images/music_concert.png"
        />
        <Filters
          usedFilters={[
            'name',
            'instruments',
            'genres',
            'promotion',
            'location',
          ]}
          setFilters={setFilters}
        />
        {musiciansList && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {musiciansList.map((musician) => (
              <Card
                key={musician.id}
                title={`${musician.givenName} ${musician.familyName}`}
                subtitle={`${musician.location} · ${musician.promotion}`}
                description={musician.description}
                genres={musician.genres.map((genre) => genre.name)}
                href={`/profile/${musician.id}`}
                tagSmall={
                  musician.isLookingForGroups ? (
                    <TagSmall
                      label="RG"
                      description="Ce joueur recherche un groupe"
                    />
                  ) : (
                    <></>
                  )
                }
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} className="h-4"></div>
      </>
    </ContentLayout>
  );
}

export default Musicians;
