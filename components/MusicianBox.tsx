import GenreLabel from './GenreLabel';
import Instrument from './Instrument';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS_DEFINITION } from '../utils/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Genres, Instruments } from '../types/api';

type MusicianBoxProps = {
  name: string;
  genres: Genres;
  instruments: Instruments;
  email: string;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
};

export default function MusicianBox({
  name,
  genres,
  instruments,
  email,
  facebook_url,
  instagram_url,
  twitter_url,
}: MusicianBoxProps): JSX.Element {
  return (
    <div className="h-40 w-96 shadow-complete rounded-lg flex relative m-5">
      <div className="w-3/6 flex">
        <div className="m-auto bg-black rounded-full w-24 h-24"></div>
      </div>
      <div className="w-full flex flex-col justify-around items-start">
        <h3 className="font-bold text-lg"> {name} </h3>
        <div className="flex flex-wrap items-center justify-start">
          {genres.map(({ id, name }) => (
            <GenreLabel key={id} genre={name} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-start">
          {instruments.map(({ id, name }) => (
            <Instrument key={id} instrument={name} />
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
        <div className="absolute text-xl cursor-pointer bottom-1 right-5 text-red-700 ">
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
    </div>
  );
}
