import { Dispatch, SetStateAction, useState } from 'react';
import { Genre, Groups, MusicianGroup } from '../types';
import { Input } from './DataEntry';
import { DetailsSection } from './Details';
import Select from 'react-select';
import { customTheme, customStyles } from '../utils/selectCustomTheme';
import { useGetGenres, useGroup } from '../api';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Options } from './DataEntry/Dropdown';

type Props = {
  group: Groups;
  setIsModify: Dispatch<SetStateAction<boolean>>;
};

export function GroupEdit({ group, setIsModify }: Props) {
  const { updateGroup } = useGroup();

  const notifySuccess = () => toast.success('Information mis à jour !');
  const notifyError = () =>
    toast.error("Les informations du groupes n'ont pas pu être mis à jour");

  const [groupName, setGroupName] = useState(group.name);
  const [location, setLocation] = useState(group.location);
  const [genres, setGenres] = useState(group.genres);
  const [admins, setAdmins] = useState<MusicianGroup[]>(
    group.members.filter((member) => member.membership === 'lite_admin'),
  );

  const { data: genresList } = useGetGenres();

  return (
    <DetailsSection title="Information">
      <div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="groupname"
            label="Name"
            displayLabel
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <span>Location</span>
            <Select
              styles={customStyles}
              value={{ label: location, value: location }}
              theme={customTheme}
              options={[
                { label: 'Douai', value: 'Douai' },
                { label: 'Lille', value: 'Lille' },
              ]}
              onChange={(e: any) => setLocation(e.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span>Genres</span>
            <Select
              styles={customStyles}
              value={genres.map((genre) => ({
                label: genre.name,
                value: genre,
              }))}
              theme={customTheme}
              options={genresList?.map((genre) => ({
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
            <span>Admins</span>
            <Select
              styles={customStyles}
              theme={customTheme}
              value={admins.map((admin) => ({
                label: admin.musician.givenName,
                value: admin,
              }))}
              options={group.members
                ?.filter((member) => member.membership !== 'admin')
                .map((member) => ({
                  label: `${member.musician.givenName} ${member.musician.familyName}`,
                  value: member,
                }))}
              isMulti
              onChange={(e: any) =>
                setAdmins(
                  e.map((option: Options<MusicianGroup[]>) => option.value),
                )
              }
            />
          </div>
        </div>
        <div className="flex gap-2 mt-3 w-full justify-end">
          <button
            onClick={() =>
              updateGroup({ id: group.id, name: groupName, location, genres })
                .then(() => {
                  setIsModify(false);
                  mutate(`/groups/${group.id}`);
                  notifySuccess();
                })
                .catch(() => notifyError())
            }
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
      </div>
    </DetailsSection>
  );
}

export default GroupEdit;
