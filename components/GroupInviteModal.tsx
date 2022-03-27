import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGroup, useGetMusicianGroups } from '../api';
import { useAuth } from '../context/AuthContext';
import { Musician } from '../types';
import { capitalize } from '../utils/string';
import PopUp from './PopUp';
import { Select } from './Select';

type Props = {
  musician?: Musician;
  close?: () => void;
};

export function GroupInviteModal({ musician, close }: Props) {
  const { inviteMusician } = useGroup();
  const { getProfil } = useAuth();
  const { data: groupList } = useGetMusicianGroups(getProfil()?.id);

  const [groupID, setGroupID] = useState('');
  const [instrumentID, setInstrumentID] = useState('');
  const [role, setRole] = useState<'member' | 'lite_admin'>('member');

  const [error, setError] = useState(false);

  const notifySuccess = () =>
    toast.success(`${musician?.givenName} a été invité!`);
  const notifyError = () =>
    toast.error(`${musician?.givenName} n'a pas pu être invité...`);

  function handleInvite() {
    if (!groupID || !instrumentID || !role) {
      setError(true);
      return;
    }
    if (!musician) return;

    if (!close) return;

    const payload = {
      groupId: groupID,
      musicianId: musician.id,
      instrumentId: instrumentID,
      role,
    };

    inviteMusician(payload)
      .then(() => {
        notifySuccess();
        close();
      })
      .catch(notifyError);
  }

  if (close && musician)
    return (
      <PopUp close={close}>
        <div className="bg-white p-8 rounded">
          <h2 className="mb-4 text-lg font-bold text-gray-700">
            Inviter:{' '}
            <span className="italic font-normal">
              {musician.givenName} {musician.familyName}
            </span>
          </h2>
          <div className="w-96 flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-gray-700">
                Dans le groupe:
              </label>
              <Select
                options={groupList?.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
                onChange={(e) => setGroupID(e.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Pour jouer du:</label>
              <Select
                options={musician.instruments?.map((instrument) => ({
                  label: capitalize(instrument.name),
                  value: instrument.id,
                }))}
                onChange={(e) => setInstrumentID(e.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">En tant que:</label>
              <Select
                options={[
                  { label: 'Membre', value: 'member' },
                  { label: 'Admin', value: 'lite_admin' },
                ]}
                onChange={(e) => setRole(e.value)}
              />
            </div>
          </div>
          {error && (
            <span className="block text-sm text-red-500">
              Vous devez compléter tous les champs
            </span>
          )}
          <button
            onClick={handleInvite}
            className="py-3 bg-green-500 text-white rounded mt-10 w-full hover:bg-green-600"
          >
            Inviter
          </button>
        </div>
      </PopUp>
    );
  return <div className="absolute"></div>;
}

export default GroupInviteModal;
