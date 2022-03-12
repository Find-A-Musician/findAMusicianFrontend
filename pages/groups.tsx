import Header from '../components/Header';
import { IGroup, ISearch } from '../components/icons';
import NewButton from '../components/NewButton';
import Card from '../components/Card';
import TagSmall from '../components/TagSmall';
import Banner from '../components/Banner';
import Dropdown, { Options } from '../components/Dropdown';
import { useState } from 'react';
import Input from '../components/Input';
import ContentLayout from '../layout/content';
import { MenuContext } from '../context/MenuContext';
import { useContext } from 'react';

export default function Groups(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card
            title="Singe"
            subtitle="4 membres"
            description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
            genres={[
              'pop',
              'rock',
              'rock',
              'sheesh',
              'sheesh',
              'sheesh',
              'sheesh',
              'sheesh',
            ]}
            href="/musicians"
            smallTag={
              <TagSmall
                label="RJ"
                description="Ce groupe recherche des musiciens"
              />
            }
            recherche={['Guitare', 'Yukulele']}
          />
          <Card
            title="Singe"
            subtitle="4 membres"
            description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
            genres={['pop', 'rock', 'rock']}
            href="/musicians"
            smallTag={
              <TagSmall
                label="RJ"
                description="Ce groupe recherche des musiciens"
              />
            }
            recherche={['Guitare', 'Yukulele']}
          />
          <Card
            title="Singe"
            subtitle="4 membres"
            description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
            genres={['pop', 'rock', 'rock']}
            href="/musicians"
            smallTag={
              <TagSmall
                label="RJ"
                description="Ce groupe recherche des musiciens"
              />
            }
            recherche={['Piano', 'Kazoo']}
          />
          <Card
            title="Singe"
            subtitle="4 membres"
            description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
            genres={['pop', 'rock', 'rock']}
            href="/musicians"
          />
          <Card
            title="Singe"
            subtitle="4 membres"
            description="Nous sommes un groupe qui fait les singes. Nous ne cherchons pas de musiciens mais des personnes sachant imiter les singes. ouhouhou."
            genres={['pop', 'rock', 'rock']}
            href="/musicians"
          />
        </div>
      </>
    </ContentLayout>
  );
}
