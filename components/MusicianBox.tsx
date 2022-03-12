import GenreLabel from './GenreLabel';
import InstrumentLabel from './InstrumentLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS_DEFINITION } from '../utils/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Genre, Instrument } from '../types';
import { useRouter } from 'next/router';

type MusicianBoxProps = {
  name: string;
  genres: Genre[];
  id: string;
  instruments: Instrument[];
  email: string;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
};

export default function MusicianBox({
  name,
  genres,
  id,
  instruments,
  email,
  facebook_url,
  instagram_url,
  twitter_url,
}: MusicianBoxProps): JSX.Element {
  const router = useRouter();

  /**Redirect to musician profile page */
  function handleRedirection(): void {
    router.push(`/profile/${id}`);
  }

  return (
    <div className="h-40 w-96 shadow-complete rounded-lg flex relative m-5">
      <div className="w-3/6 flex">
        <div className="m-auto bg-black rounded-full w-24 h-24"></div>
      </div>
      <div className="w-full flex flex-col justify-around items-start">
        <h3 className="font-bold text-lg"> {name} </h3>
        <div className="flex flex-wrap items-center justify-start">
          {genres.map((genre) => (
            <GenreLabel key={genre.id} genre={genre} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start">
          {instruments.map((instrument) => (
            <InstrumentLabel key={instrument.id} instrument={instrument} />
          ))}
        </div>
        <div className="flex items-center justify-start w-full text-lg">
          {facebook_url && (
            <FontAwesomeIcon
              className={`mr-6 cursor-pointer ${ICONS_DEFINITION['facebook'].color}`}
              icon={ICONS_DEFINITION['facebook'].icon}
            />
          )}
          {instagram_url && (
            <FontAwesomeIcon
              className={`mr-6 cursor-pointer ${ICONS_DEFINITION['instagram'].color}`}
              icon={ICONS_DEFINITION['instagram'].icon}
            />
          )}
          {twitter_url && (
            <FontAwesomeIcon
              className={`mr-6 cursor-pointer ${ICONS_DEFINITION['twitter'].color}`}
              icon={ICONS_DEFINITION['twitter'].icon}
            />
          )}
          <FontAwesomeIcon
            className={`mr-6 cursor-pointer ${ICONS_DEFINITION['letter'].color}`}
            icon={ICONS_DEFINITION['letter'].icon}
          />
        </div>
        <button
          onClick={handleRedirection}
          className="absolute text-xl cursor-pointer bottom-1 right-5 text-red-700 "
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </div>
    </div>
  );
}
