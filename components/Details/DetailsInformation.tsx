import DetailsSection from './DetailsSection';
import { Instrument, Genre } from '../../types';
import { capitalize } from '../../utils/string';
import { useState } from 'react';
import { Input } from '../DataEntry';
import { Location, Promotion } from '../../types/Musician';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Options } from '../DataEntry/Dropdown';
import { useGetInstruments, useGetGenres } from '../../api';
import { useAxios } from '../../context/AxiosContext';
import { Select } from '../Select';

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
  value: Options<T> | Options<T>[];
  isModify?: boolean;
  onChange?: (e: any) => void;
  options?: Options<T>[];
  isMulti?: boolean;
}): JSX.Element {
  function format(arr: any): string {
    return arr.map((el: any) => capitalize(el.name)).join(', ');
  }
  return (
    <div>
      <span className="block">{title}</span>
      {isModify ? (
        <>
          {options?.length ? (
            <Select
              value={value}
              options={options}
              onChange={onChange}
              isMulti={isMulti}
            />
          ) : (
            <Input
              id={title}
              value={value instanceof Array ? value[0].label : value.label}
              label={title}
              onChange={onChange}
            />
          )}
        </>
      ) : (
        <span className="text-black block">
          {value instanceof Array
            ? format(value.map((v) => v.value))
            : value.label}
        </span>
      )}
    </div>
  );
}

export function DetailsInformation({
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
  const [newGenres, setNewGenres] = useState<Genre[]>(genres);

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
    <DetailsSection
      title="Information"
      canBeModified={canBeModified}
      modifyOnClick={() => setIsModify(!isModify)}
    >
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Info
            title="Promotion"
            value={{ label: newPromotion, value: newPromotion }}
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
            value={{ label: newLocation, value: newLocation }}
            isModify={isModify}
            options={[
              { label: 'Douai', value: 'Douai' },
              { label: 'Lille', value: 'Lille' },
            ]}
            onChange={(e) => setNewLocation(e.value)}
          />
          <Info
            title="Email"
            value={{ label: newEmail, value: newEmail }}
            isModify={isModify}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <Info
            title="Instruments"
            isModify={isModify}
            isMulti
            value={newInstruments.map((instrument) => ({
              label: instrument.name,
              value: instrument,
            }))}
            options={instrumentList?.map((i) => ({
              label: i.name,
              value: i,
            }))}
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
            value={newGenres.map((genre) => ({
              label: capitalize(genre.name),
              value: genre,
            }))}
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
    </DetailsSection>
  );
}

export default DetailsInformation;
