import useSWR from 'swr';
import { useAxios } from '../context/AxiosContext';
import { Musician } from '../types';
import { IGroup, ISearch } from '../components/icons';
import ContentLayout from '../layout/content';
import Header from '../components/Header';
import { MenuContext } from '../context/MenuContext';
import { useContext, useState } from 'react';
import Banner from '../components/Banner';
import { Input, Dropdown } from '../components/DataEntry';
import { Options } from '../components/DataEntry/Dropdown';
import Card from '../components/Card';

export function Musicians(): JSX.Element {
  const { authAxios } = useAxios();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  const { data: musiciansList, error } = useSWR<Musician[]>(
    '/musicians',
    (url) => authAxios.get(url).then((res) => res.data),
  );

  const optionsGenre = [
    {
      label: 'Rock',
      value: 'rock',
    },
    {
      label: 'Metal',
      value: 'metal',
    },
    {
      label: 'Rap',
      value: 'rap',
    },
  ];

  const optionsSite: Options<string>[] = [
    {
      label: 'Douai',
      value: 'douai',
    },
    {
      label: 'Lille',
      value: 'lille',
    },
  ];

  const optionsInstrument: Options<string>[] = [
    {
      label: 'Piano',
      value: 'piano',
    },
    {
      label: 'Saxophone',
      value: 'saxophone',
    },
    {
      label: 'Guitar',
      value: 'guitar',
    },
  ];

  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState('');

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

        <div className="sticky top-28 pb-2 -mb-2 bg-white flex flex-wrap gap-4 justify-between">
          <div className="flex flex-wrap gap-4">
            <Dropdown
              label="Instruments"
              options={optionsInstrument}
              selected={selectedInstrument}
              setSelected={setSelectedInstrument}
            />
            <Dropdown
              label="Genres"
              options={optionsGenre}
              selected={selectedGenre}
              setSelected={setSelectedGenre}
            />

            <Dropdown
              label="Sites"
              options={optionsSite}
              selected={selectedSite}
              setSelected={setSelectedSite}
            />
          </div>

          <Input
            id="rechercher"
            placeholder="rechercher"
            label="searchbar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            icon={<ISearch />}
          />
        </div>
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
              />
            ))}
          </div>
        )}
      </>
    </ContentLayout>
  );
}

export default Musicians;
