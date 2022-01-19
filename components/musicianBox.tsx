import GenreLabel from './genreLabel';
import Instrument from './instrument';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Genres, Instruments } from '../index';

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
              className="mr-6 cursor-pointer text-blue-700"
              icon={faFacebookSquare}
            />
          )}
          {instagram_url && (
            <FontAwesomeIcon
              className="mr-6 cursor-pointer text-pink-700"
              icon={faInstagram}
            />
          )}
          {twitter_url && (
            <FontAwesomeIcon
              className="mr-6 cursor-pointer text-cyan-500"
              icon={faTwitter}
            />
          )}
          <FontAwesomeIcon className="mr-6 cursor-pointer" icon={faEnvelope} />
        </div>
        <div className="absolute text-xl cursor-pointer bottom-1 right-5 text-red-700 ">
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
    </div>
  );
}
