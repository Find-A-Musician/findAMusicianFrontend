import useSWR from 'swr';
import { useAxios } from '../context/AxiosContext';
import { Musician } from '../types';
import { IGroup } from '../components/icons';
import { Filters } from '../components/DataEntry';
import ContentLayout from '../layout/content';
import Header from '../components/Header';
import { MenuContext } from '../context/MenuContext';
import { useContext, useState } from 'react';
import Banner from '../components/Banner';
import Card from '../components/Card';
import { FiltersType } from '../components/DataEntry/Filters';

export function Musicians(): JSX.Element {
  const { authAxios } = useAxios();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  const [filters, setFilters] = useState<FiltersType>({ params: {} });

  const { data: musiciansList, error } = useSWR<Musician[]>(
    ['/musicians', filters],
    (url, filters) => authAxios.get(url, filters).then((res) => res.data),
  );

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
                description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
                genres={musician.genres.map((genre) => genre.name)}
                href={`/profile/${musician.id}`}
              />
            ))}
          </div>
        )}
      </>
    </ContentLayout>
  );
}

export default Musicians;
