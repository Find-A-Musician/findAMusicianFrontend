import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetGenres, useGetInstruments, useGroup } from '../../api';
import Banner from '../../components/Banner';
import { Input } from '../../components/DataEntry';
import { Options } from '../../components/DataEntry/Dropdown';
import Header from '../../components/Header';
import { IGroup } from '../../components/icons';
import { Select } from '../../components/Select';
import { MenuContext } from '../../context/MenuContext';
import ContentLayout from '../../layout/content';
import { Genre, Instrument } from '../../types';
import { Location } from '../../types/Musician';
import { capitalize } from '../../utils/string';
import { useRouter } from 'next/router';

export function CreateGroup() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const [groupeName, setGroupName] = useState('');
  const [location, setLocation] = useState<Location>();
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState<Genre[]>();
  const [instruments, setInstruments] = useState<Instrument[]>();

  const { data: genreList } = useGetGenres();
  const { data: instrumentList } = useGetInstruments();

  const [error, setError] = useState(false);

  const notifySuccess = () => toast.success('Le groupe a été créé');
  const notifyError = () => toast.error("Le compte n'a pas pu être créé...");

  const { createGroup } = useGroup();
  const router = useRouter();
  async function handleCreateGroup() {
    if (!groupeName || !location || !description || !genres || !instruments) {
      setError(true);
      return;
    }

    const payload = {
      group: {
        name: groupeName,
        description,
        location,
        genres,
      },
      instruments,
    };

    createGroup(payload)
      .then((res) => {
        notifySuccess();
        router.push(`/groups/${res.id}`);
      })
      .catch(notifyError);
  }

  return (
    <ContentLayout
      Header={
        <Header
          title="Créer un groupe"
          icon={<IGroup />}
          hamburgerOnClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      }
    >
      <>
        <Banner
          title="Crée le"
          boldTitle="groupe parfait!"
          subtitle="Plus besoin de galérer pour trouver l'équipe parfaite"
          imagePath="/images/music_concert.png"
        />
        {error && (
          <span className="text-red-500">
            Vous devez compléter tous les champs pour créer un groupe!
          </span>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="name"
            label="Nom du groupe"
            displayLabel
            value={groupeName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Location</span>
            <Select
              options={[
                { label: 'Lille', value: 'Lille' },
                { label: 'Douai', value: 'Douai' },
              ]}
              onChange={(e) => setLocation(e.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <span className="text-gray-700">Description</span>
            <textarea
              name="description"
              rows={8}
              className="bg-gray-50 rounded border text-gray-500 px-3 py-1.5"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">Genres</span>
            <Select
              options={genreList?.map((genre) => ({
                label: genre.name,
                value: genre,
              }))}
              isMulti
              onChange={(e: any) =>
                setGenres(e.map((option: Options<Genre>) => option.value))
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-700">
              Les instruments que je joue dans le groupe
            </span>
            <Select
              options={instrumentList?.map((genre) => ({
                label: capitalize(genre.name),
                value: genre,
              }))}
              isMulti
              onChange={(e: any) =>
                setInstruments(
                  e.map((option: Options<Instrument>) => option.value),
                )
              }
            />
          </div>
          <button
            onClick={handleCreateGroup}
            className="py-2.5 bg-green-500 rounded text-white font-medium mt-6 col-start-2 hover:bg-green-600"
          >
            Créer le groupe
          </button>
        </div>
      </>
    </ContentLayout>
  );
}

export default CreateGroup;
