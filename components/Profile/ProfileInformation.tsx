import ProfileSection from './ProfileSection';
import { Instrument, Genre } from '../../types';
import { capitalize } from '../../utils/string';
import { useState } from 'react';
import { Input } from '../DataEntry';
import { Location, Promotion } from '../../types/Musician';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import Select from 'react-select';
import { customTheme, customStyles } from '../../utils/selectCustomTheme';
import { Options } from '../DataEntry/Dropdown';
import { useGetInstruments, useGetGenres } from '../../api';
import { useAxios } from '../../context/AxiosContext';

type Props = {
  promotion: Promotion;
  localisation: Location;
  email: string;
  genres: Genre[];
  instruments: Instrument[];
  canBeModified?: boolean;
};

function Info<T>({
  title,
  value,
  isModify,
  onChange,
  options,
  isMulti,
}: {
  title: string;
  value: string;
  isModify?: boolean;
  onChange?: (e: any) => void;
  options?: Options<T>[];
  isMulti?: boolean;
}): JSX.Element {
  return (
    <div>
      <span className="block">{title}</span>
      {isModify ? (
        <>
          {options?.length ? (
            <Select
              styles={customStyles}
              theme={customTheme}
              options={options}
              onChange={onChange}
              isMulti={isMulti}
            />
          ) : (
            <Input id={title} value={value} label={title} onChange={onChange} />
          )}
        </>
      ) : (
        <span className="text-black block">{value}</span>
      )}
    </div>
  );
}

export function ProfileInformation({
  promotion,
  localisation,
  email,
  genres,
  instruments,
  canBeModified,
}: Props) {
  const { data: instrumentList } = useGetInstruments();
  const { data: genreList } = useGetGenres();
  const { authAxios } = useAxios();

  const notifySuccess = () => toast.success('Description mis à jour !');
  const notifyError = () =>
    toast.error("La description n'a pas pu être mis à jour");

  const [isModify, setIsModify] = useState(false);
  const [newPromotion, setNewPromotion] = useState<Promotion>(promotion);
  const [newLocation, setNewLocation] = useState<Location>(localisation);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newInstruments, setNewInstruments] =
    useState<Instrument[]>(instruments);
  const [newGenres, setNewGenres] = useState<Instrument[]>(instruments);

  function format(arr: Instrument[] | Genre[]): string {
    return arr.map((el) => capitalize(el.name)).join(', ');
  }

  async function saveInformation() {
    let payload = {
      promotion: newPromotion,
      location: newLocation,
      email: newEmail,
      instruments,
      genres,
    };

    if (newInstruments.length) payload.instruments = newInstruments;
    if (newGenres.length) payload.genres = newGenres;

    authAxios
      .patch('/profil', payload)
      .then(() => {
        notifySuccess();
        setIsModify(false);
        mutate('/profil');
      })
      .catch(() => notifyError());
  }

  return (
    <ProfileSection
      title="Information"
      canBeModified={canBeModified}
      modifyOnClick={() => setIsModify(!isModify)}
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Info
            title="Promotion"
            value={newPromotion}
            isModify={isModify}
            options={[
              { label: 'L1', value: 'L1' },
              { label: 'L2', value: 'L2' },
              { label: 'L3', value: 'L3' },
              { label: 'M1', value: 'M1' },
              { label: 'M2', value: 'M2' },
            ]}
            onChange={(e) => setNewPromotion(e.value)}
          />
          <Info
            title="Localisation"
            value={newLocation}
            isModify={isModify}
            options={[
              { label: 'Douai', value: 'Douai' },
              { label: 'Lille', value: 'Lille' },
            ]}
            onChange={(e) => setNewLocation(e.value)}
          />
          <Info
            title="Email"
            value={newEmail}
            isModify={isModify}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Info
            title="Instruments"
            isModify={isModify}
            isMulti
            options={instrumentList?.map((i) => ({
              label: i.name,
              value: i,
            }))}
            value={format(instruments)}
            onChange={(e) => {
              setNewInstruments(
                e.map((option: Options<Instrument>) => option.value),
              );
            }}
          />
          <Info
            title="Genres"
            isModify={isModify}
            isMulti
            options={genreList?.map((g) => ({
              label: g.name,
              value: g,
            }))}
            value={format(genres)}
            onChange={(e) => {
              setNewGenres(e.map((option: Options<Genre>) => option.value));
            }}
          />
        </div>
        {isModify && (
          <div className="flex gap-2 mt-3 w-full justify-end">
            <button
              onClick={() => saveInformation()}
              className="px-3 py-1.5 bg-green-500 rounded text-white hover:bg-green-600"
            >
              Sauvegarder
            </button>
            <button
              onClick={() => setIsModify(false)}
              className="px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        )}
      </>
    </ProfileSection>
  );
}

export default ProfileInformation;
