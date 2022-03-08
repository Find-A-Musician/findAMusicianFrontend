import Header from '../components/Header';
import { IGroup } from '../components/icons';
import NewButton from '../components/NewButton';
import Banner from '../components/Banner';
import Dropdown, { Options } from '../components/Dropdown';
import { useState } from 'react';

export default function Groups(): JSX.Element {
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

  const optionsSite: Options[] = [
    {
      label: 'Douai',
      value: 'douai',
    },
    {
      label: 'Lille',
      value: 'lille',
    },
  ];

  const optionsInstrument: Options[] = [
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

  return (
    <div className="flex flex-col gap-10">
      <Header
        title="Groupes"
        subtitle="420 groupes"
        icon={<IGroup />}
        rightComponents={<NewButton label="Créer un groupe" />}
      />
      <Banner
        title="Trouve le"
        boldTitle="groupe parfait!"
        subtitle="Plus besoin de galérer pour trouver l'équipe parfaite"
        imagePath="/images/music_concert.png"
      />
      <div className="flex gap-4">
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
    </div>
  );
}
