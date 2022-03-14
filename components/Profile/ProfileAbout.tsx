import { useState } from 'react';
import { Musician } from '../../types';
import { ProfileSection } from './ProfileSection';
import { useAxios } from '../../context/AxiosContext';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

type Props = {
  profil: Musician;
  canBeModified?: boolean;
};

export function ProfileAbout({ profil, canBeModified }: Props) {
  const [isModify, setIsModify] = useState(false);
  const [description, setDescription] = useState(profil.description || '');
  const { authAxios } = useAxios();
  const notifySuccess = () => toast.success('Description mis à jour !');
  const notifyError = () =>
    toast.error("La description n'a pas pu être mis à jour");

  async function saveDescription() {
    authAxios
      .patch('/profil', { description })
      .then(() => {
        notifySuccess();
        setIsModify(false);
        mutate('/profil');
      })
      .catch(() => notifyError());
  }

  return (
    <ProfileSection
      title="A propos"
      modifyOnClick={() => {
        setIsModify(!isModify);
      }}
      canBeModified={canBeModified}
    >
      {isModify ? (
        <>
          <textarea
            name="edit profile description"
            className="w-full bg-gray-50 h-fit"
            rows={14}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 mt-3 w-full justify-end">
            <button
              onClick={() => saveDescription()}
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
        </>
      ) : (
        <>
          {description.split('\n').map((paragraph, index) => {
            if (paragraph.length === 0) return <br />;
            return <p key={index}>{paragraph}</p>;
          })}
        </>
      )}
    </ProfileSection>
  );
}
