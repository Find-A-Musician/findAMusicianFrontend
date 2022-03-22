import { Dispatch, SetStateAction, useState } from 'react';
import { Groups } from '../types';
import { Input } from './DataEntry';
import { DetailsSection } from './Details';
import Select from 'react-select';
import { customTheme, customStyles } from '../utils/selectCustomTheme';
import { useGroup } from '../api';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

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

  return (
    <DetailsSection title="Information">
      <div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="groupname"
            label="groupname"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Select
            styles={customStyles}
            theme={customTheme}
            options={[
              { label: 'Douai', value: 'Douai' },
              { label: 'Lille', value: 'Lille' },
            ]}
            onChange={(e: any) => setLocation(e.value)}
          />
        </div>
        <div className="flex gap-2 mt-3 w-full justify-end">
          <button
            onClick={() =>
              updateGroup({ id: group.id, name: groupName, location })
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
