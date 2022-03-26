import { Dispatch, SetStateAction, useState } from 'react';
import { Genre, Groups, MusicianGroup } from '../types';
import { Input } from './DataEntry';
import { DetailsSection } from './Details';
import { useGetGenres, useGroup } from '../api';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Options } from './DataEntry/Dropdown';
import { Select } from './Select';
import PopUp from './PopUp';
import { useRouter } from 'next/router';

type Props = {
  group: Groups;
  setIsModify: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  isLiteAdmin: boolean;
};

export function GroupEdit({ group, setIsModify, isAdmin, isLiteAdmin }: Props) {
  const { updateGroup, updateAdmins, kickMusician, deleteGroup } = useGroup();
  const router = useRouter();

  const notifySuccess = () => toast.success('Information mis à jour !');
  const notifyError = () =>
    toast.error("Les informations du groupes n'ont pas pu être mis à jour");
  const notifyGroupDelete = () => toast.success('Le groupe a été supprimé');
  const notifyGroupDeleteError = () =>
    toast.error("Le groupe n'a pas pu être supprimé");

  const [groupName, setGroupName] = useState(group.name);
  const [location, setLocation] = useState(group.location);
  const [genres, setGenres] = useState(group.genres);
  const [admins, setAdmins] = useState<MusicianGroup[]>(
    group.members.filter((member) => member.membership === 'lite_admin'),
  );
  const [kickMusicianID, setKickMusicianID] = useState('');

  const { data: genresList } = useGetGenres();

  const [deleteGroupModal, setDeleteGroupModal] = useState(false);

  function handleDeleteGroup() {
    deleteGroup(group.id)
      .then(() => {
        router.push('/groups');
        mutate('/groups');
        notifyGroupDelete();
      })
      .catch(notifyGroupDeleteError);
  }

  function handleKickMusician() {
    if (kickMusicianID.length)
      kickMusician(group.id, kickMusicianID)
        .then(() => {
          notifySuccess();
          setKickMusicianID('');
          mutate(`/groups/${group.id}`);
        })
        .catch(notifyError);
  }

  return (
    <DetailsSection title="Information">
      <div>
        {deleteGroupModal && (
          <PopUp close={() => setDeleteGroupModal(false)}>
            <div className="bg-white p-10 rounded">
              <h2>Êtes-vous sûr de vouloir supprimer le groupe ?</h2>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleDeleteGroup}
                  className="px-3 py-1.5 rounded text-white bg-red-500 hover:bg-red-400"
                >
                  Oui, supprimer le groupe
                </button>
                <button
                  onClick={() => setDeleteGroupModal(false)}
                  className="px-3 py-1.5 rounded border hover:bg-gray-100"
                >
                  Non, annuler
                </button>
              </div>
            </div>
          </PopUp>
        )}
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
              value={{ label: location, value: location }}
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
              value={genres.map((genre) => ({
                label: genre.name,
                value: genre,
              }))}
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
        </div>

        <div className="h-px bg-gray-300 my-4"></div>

        <div className="grid sm:grid-cols-2 gap-4">
          {(isAdmin || isLiteAdmin) && (
            <>
              <div className="flex flex-col gap-1">
                <span>Admins</span>
                <Select
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
              <div className="flex flex-col gap-1">
                <span>Retirer des musiciens</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Select
                      onChange={(e) => setKickMusicianID(e.value.musician.id)}
                      options={group.members
                        ?.filter((member) => {
                          if (isAdmin) return member.membership !== 'admin';
                          return (
                            member.membership !== 'admin' &&
                            member.membership !== 'lite_admin'
                          );
                        })
                        .map((member) => ({
                          label: `${member.musician.givenName} ${member.musician.familyName}`,
                          value: member,
                        }))}
                    />
                  </div>
                  <button
                    onClick={handleKickMusician}
                    className="bg-red-500 rounded text-white hover:bg-red-400"
                  >
                    Bye bye
                  </button>
                </div>
              </div>
            </>
          )}
          {isAdmin && (
            <button
              className="col-start-2 py-2 rounded bg-red-500 text-white hover:bg-red-400"
              onClick={() => setDeleteGroupModal(true)}
            >
              Supprimer le groupe
            </button>
          )}
        </div>
        <div className="flex gap-2 mt-10 w-full justify-end">
          <button
            onClick={async () => {
              try {
                await updateGroup({
                  id: group.id,
                  name: groupName,
                  location,
                  genres,
                });

                await updateAdmins(
                  group.id,
                  admins.map((member) => member.musician.id),
                );

                setIsModify(false);
                mutate(`/groups/${group.id}`);
                notifySuccess();
              } catch (error) {
                notifyError();
              }
            }}
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
