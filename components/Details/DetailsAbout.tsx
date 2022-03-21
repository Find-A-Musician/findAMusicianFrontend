import { useState } from 'react';
import { Groups, Musician } from '../../types';
import { DetailsSection } from './DetailsSection';
import { useAxios } from '../../context/AxiosContext';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

type Props = {
  profil: Groups | Musician;
  isGroup?: boolean;
  canBeModified?: boolean;
};

/**This component can be used for either a musician or a group. If you use it for a group set isGroup prop to true and pass in a group to profil */
export function DetailsAbout({
  profil,
  isGroup = false,
  canBeModified,
}: Props) {
  const [isModify, setIsModify] = useState(false);
  const [description, setDescription] = useState(profil.description || '');
  const { authAxios } = useAxios();
  const notifySuccess = () => toast.success('Description mis à jour !');
  const notifyError = () =>
    toast.error("La description n'a pas pu être mis à jour");

  const url = isGroup ? `/groups/${profil.id}` : '/profil';

  async function saveDescription() {
    authAxios
      .patch(url, { description })
      .then(() => {
        notifySuccess();
        setIsModify(false);
        mutate(isGroup ? '/groups' : 'profil');
      })
      .catch(() => notifyError());
  }

  return (
    <DetailsSection
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
          {description.length ? (
            description.split('\n').map((paragraph, index) => {
              if (paragraph.length === 0) return <br key={index} />;
              return <p key={index}>{paragraph}</p>;
            })
          ) : (
            <p>
              Vous n'avez pas de description. Parlez nous de vous et{' '}
              <button
                onClick={() => setIsModify(true)}
                className="text-blue-500 hover:underline"
              >
                clickez ici
              </button>{' '}
              !
            </p>
          )}
        </>
      )}
    </DetailsSection>
  );
}
