import Header from '../../components/Header';
import { capitalize } from '../../utils/string';
import { IGroup, ISearch } from '../../components/icons';
import NewButton from '../../components/NewButton';
import Card from '../../components/Card';
import TagSmall from '..//../components/TagSmall';
import Banner from '../../components/Banner';
import Dropdown, { Options } from '../../components/Dropdown';
import { useState } from 'react';
import Input from '../../components/Input';
import ContentLayout from '../../layout/content';
import { MenuContext } from '../../context/MenuContext';
import { useContext } from 'react';
import { useAxios } from '../../context/AxiosContext';
import { Genre, Groups } from '../../types';
import useSWR from 'swr';

export default function GroupsPage(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { publicAxios, authAxios } = useAxios();

  const { data: groupList } = useSWR<Groups[]>('/groups', (url) =>
    authAxios.get(url).then((res) => res.data),
  );

  const { data: genreList } = useSWR<Genre[]>('/genres', (url) =>
    publicAxios.get(url).then((res) => res.data),
  );

  const { data: instrumentList } = useSWR<Genre[]>('/instruments', (url) =>
    publicAxios.get(url).then((res) => res.data),
  );
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

  const [selectedGenre, setSelectedGenre] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState('');

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
        <div className="sticky top-28 pb-2 -mb-2 bg-white flex flex-wrap gap-4 justify-between z-10">
          <div className="flex flex-wrap gap-4">
            {instrumentList && (
              <Dropdown
                label="Instruments"
                options={instrumentList.map((instrument) => {
                  return {
                    label: capitalize(instrument.name),
                    value: instrument.name,
                  };
                })}
                selected={selectedInstrument}
                setSelected={setSelectedInstrument}
              />
            )}
            {genreList && (
              <Dropdown
                label="Genres"
                options={genreList.map((genre) => {
                  return { label: capitalize(genre.name), value: genre.name };
                })}
                selected={selectedGenre}
                setSelected={setSelectedGenre}
              />
            )}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groupList &&
            groupList.map((group) => (
              <Card
                key={group.id}
                title={group.name}
                subtitle={`${group.members.length} membres`}
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
