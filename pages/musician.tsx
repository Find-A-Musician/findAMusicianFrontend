import useSWR from 'swr';
import { useAxios } from '../context/AxiosContext';
import MusicianBoxSkeleton from '../components/musicianBoxSqueleton';
import MusicianBox from '../components/musicianBox';
import { Profil } from '../types/api';

export default function Musician(): JSX.Element {
  const { authAxios } = useAxios();

  const { data: musiciansList, error } = useSWR<Profil[]>('/musicians', (url) =>
    authAxios.get(url).then((res) => res.data),
  );

  if (!musiciansList) {
    return (
      <div className="w-full flex-wrap h-full flex items-center justify-around">
        {[...Array(5)].map((_, index) => (
          <MusicianBoxSkeleton key={`musician-skeleton-${index}`} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="w-full flex-wrap h-full flex items-center justify-around">
        {musiciansList.map((musician) => (
          <MusicianBox
            key={musician.id}
            name={musician.givenName + ' ' + musician?.familyName}
            email={musician.email}
            genres={musician.genres}
            instruments={musician.instruments}
            facebook_url={musician.facebook_url}
            instagram_url={musician.instagram_url}
            twitter_url={musician.twitter_url}
          />
        ))}
      </div>
    );
  }
}
