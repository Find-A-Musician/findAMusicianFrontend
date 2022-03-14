import { useState } from 'react';
import { Groups, Musician } from '../../types';
import { capitalize } from '../../utils/string';
import Toggle from '../Toggle';
import { useAxios } from '../../context/AxiosContext';
import { mutate } from 'swr';

type Props = {
  profil: Musician;
  /**Use to know if we need to display toggle */
  isMyProfile?: boolean;
  groups?: Groups[];
};

export function ProfileBanner({ profil, isMyProfile = false, groups }: Props) {
  const [isLookingForGroups, setIsLookingForGroups] = useState(
    profil.isLookingForGroups,
  );

  const { authAxios } = useAxios();

  async function toggleLookingForGroup(isLookingForGroups: boolean) {
    await authAxios.patch('/profil', {
      isLookingForGroups: isLookingForGroups,
    });
    mutate('/profil');
  }

  return (
    <div>
      <div
        className="w-full rounded-xl bg-gray-100 h-44"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '60% 40%',
          backgroundImage: `url("/images/tailor.png")`,
        }}
      ></div>
      <div className="flex items-center gap-6">
        <div className="lg:flex-none w-52 h-52 border-2 border-white ml-10 -mt-20 rounded-3xl md:rounded-full bg-red-100"></div>
        <div className="flex flex-wrap gap-4 items-center w-full lg:-mt-10">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold">
              {profil.givenName} {profil.familyName}
            </h2>
            <span className="text-lg text-gray-500">
              {groups?.length
                ? groups?.map((group) => capitalize(group.name)).join(', ')
                : 'Pas de groupe'}
            </span>
          </div>
          {isMyProfile && (
            <Toggle
              checkLabel="Je recherche un groupe"
              uncheckLabel="Je ne recherche pas un groupe"
              isCheck={isLookingForGroups}
              onClick={() => {
                setIsLookingForGroups(!isLookingForGroups);
                toggleLookingForGroup(!isLookingForGroups);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileBanner;
