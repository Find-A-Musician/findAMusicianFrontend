import { FormEvent, useState } from 'react';
import TextInput from './TextInput';
import Button from './Button';
import SelectGenre from './SelectGenre';
import SelectInstrument from './SelectInstrument';
import Select from './Select';
import LoaderSpinner from './LoaderSpinner';
import { Genres, Instruments } from '../types/api';
import { useAxios } from '../context/AxiosContext';
import { setCookie, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import useSWR from 'swr';

enum RegisterError {
  'passwordNotEqual' = 'Les mots de passes ne correspondent pas',
  'passwordNotLongEnough' = 'Ton mot de passe doit contenir au moins 8 caractères',
  'genre' = 'Choissis au moins un genre',
  'instrument' = 'Choissis au moins un instrument',
  'server' = "Une erreur inconnue s'est produite, réessaye plus tard",
  'email' = "L'email est dejà utilisé",
}

const promotions = ['L1', 'L2', 'L3', 'M1', 'M2'] as const;

const locations = ['Douai', 'Lille'] as const;

export default function RegisterModal() {
  const { publicAxios } = useAxios();
  const { setAuthState } = useAuth();
  const router = useRouter();

  // First page state
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState<number>();
  const [passwordFirst, setPasswordFirst] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [promotion, setPromotion] = useState<typeof promotions[number]>(
    promotions[0],
  );
  const [location, setLocation] = useState<typeof locations[number]>(
    locations[0],
  );

  // Second page state
  const [genres, setGenres] = useState<Genres>([]);
  const [instruments, setInstruments] = useState<Instruments>([]);
  const [facebookUrl, setFacebookUrl] = useState<string>();
  const [twitterUrl, setTwitterUrl] = useState<string>();
  const [instagramUrl, setInstagramUrl] = useState<string>();

  const [error, setError] = useState<RegisterError>();
  const [loading, setloading] = useState(false);

  const [currentPage, setCurrentPage] = useState<1 | 2>(1);

  const { data: genresList } = useSWR<Genres>('/genres', (url) =>
    publicAxios.get(url).then(({ data }) => data),
  );

  const { data: instrumentsList } = useSWR<Instruments>('/instruments', (url) =>
    publicAxios.get(url).then(({ data }) => data),
  );

  function submitFirstPage(e: FormEvent) {
    e.preventDefault();
    if (passwordFirst !== passwordSecond) {
      setError(RegisterError.passwordNotEqual);
      return;
    }

    if (passwordFirst.length < 8) {
      setError(RegisterError.passwordNotLongEnough);
      return;
    }
    setError(undefined);
    setCurrentPage(2);
  }

  async function submitSecondPage(e: FormEvent) {
    e.preventDefault();
    if (genres.length === 0) {
      setError(RegisterError.genre);
      return;
    }
    if (instruments.length === 0) {
      setError(RegisterError.instrument);
      return;
    }
    setError(undefined);
    setloading(true);
    publicAxios
      .post('/register', {
        musician: {
          email,
          givenName,
          familyName,
          phone,
          facebook_url: facebookUrl || null,
          twitter_url: twitterUrl || null,
          instagram_url: instagramUrl || null,
          promotion,
          location,
          genres,
          instruments,
        },
        password: passwordFirst,
      })
      .then(
        ({
          data: {
            token: { accessToken, refreshToken },
            musician,
          },
        }) => {
          setAuthState({
            accessToken: accessToken,
            refreshToken: refreshToken,
            profil: musician,
            authenticated: true,
          });
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);

          if (router.query.redirectTo) {
            router.push(router.query.redirectTo as string);
          } else {
            router.push('/musician');
          }
        },
      )
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              setError(RegisterError.email);
              break;
            case 500:
              setError(RegisterError.server);
              break;
          }
        } else {
          setError(RegisterError.server);
        }
        setloading(false);
      });
  }

  return (
    <div className="w-[800px] h-[500px] flex flex-col items-center justify-between py-2 px-10 rounded-2xl bg-white">
      <div>
        <h2 className="text-red-800 text-2xl font-black">Inscris toi !</h2>
      </div>
      {currentPage == 1 && (
        <form
          className="flex flex-col w-full flex-1"
          onSubmit={(e) => submitFirstPage(e)}
        >
          <div className="flex flex-wrap justify-between items-center w-full h-full ">
            <div className="h-full flex flex-col justify-around">
              <TextInput
                tabIndex={1}
                id="registerFamilyNameinput"
                type="text"
                label="Nom"
                placeholder="Votre nom"
                required
                autoComplete="family-name"
                value={familyName}
                onChange={(e) => {
                  setFamilyName(e.target.value);
                }}
              />
              <TextInput
                tabIndex={3}
                id="registerEmailinput"
                type="email"
                label="Email"
                placeholder="Votre email"
                autoComplete="email"
                icon="letter"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextInput
                tabIndex={5}
                id="promotion"
                type="password"
                label="Mot de passe"
                placeholder="Votre mot de passe"
                required
                value={passwordFirst}
                onChange={(e) => {
                  setPasswordFirst(e.target.value);
                }}
              />
              <Select
                options={promotions}
                selectedOption={promotion}
                setSelectedOption={setPromotion}
                label="Ta promotion"
                tabIndex={7}
              />
            </div>
            <div className="h-full flex flex-col justify-around">
              <TextInput
                tabIndex={2}
                id="registerGivenNameinput"
                type="text"
                label="Prénom"
                placeholder="Votre prénom"
                required
                autoComplete="given-name"
                value={givenName}
                onChange={(e) => {
                  setGivenName(e.target.value);
                }}
              />

              <TextInput
                tabIndex={4}
                id="registerPhoneinput"
                type="number"
                label="Téléphone (optionnel)"
                placeholder="Votre téléphone"
                autoComplete="tel"
                value={phone}
                icon="phone"
                onChange={(e) => {
                  setPhone(parseInt(e.target.value));
                }}
              />

              <TextInput
                tabIndex={6}
                id="registerSecondMDPinput"
                type="password"
                label="Confirmation du mot de passe"
                placeholder="Confirmer votre mot de passe"
                value={passwordSecond}
                required
                onChange={(e) => {
                  setPasswordSecond(e.target.value);
                }}
              />
              <Select
                options={locations}
                selectedOption={location}
                setSelectedOption={setLocation}
                label="Ta ville"
                tabIndex={8}
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-full">
            {error && <p className="text-red-700 "> {error} </p>}
            <Button tabIndex={9} label="Suivant" isLarge bold type="submit" />
          </div>
        </form>
      )}
      {currentPage == 2 && (
        <form
          className="flex flex-col w-full flex-1"
          onSubmit={(e) => submitSecondPage(e)}
        >
          <div className="flex flex-col justify-around items-center w-full h-full">
            <div className="flex flex-col items-start w-full" tabIndex={1}>
              <p className="font-bold">Quels styles de musiques joues-tu ?</p>
              <SelectGenre
                selectedGenre={genres}
                setSelectedGenre={setGenres}
                genres={genresList}
              />
            </div>
            <div className="flex flex-col items-start w-full" tabIndex={2}>
              <p className="font-bold">
                Quels instruments de musiques joues-tu ?
              </p>
              <SelectInstrument
                selectedInstrument={instruments}
                setSelectedInstrument={setInstruments}
                instruments={instrumentsList}
              />
            </div>
            <TextInput
              label="Facebook (Optionnel)"
              placeholder="URL facebook"
              icon="facebook"
              isFull
              type="text"
              id="registerFacebook"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
            />
            <TextInput
              label="Instagram (Optionnel)"
              placeholder="URL instagram"
              icon="instagram"
              isFull
              type="text"
              id="registerinstagram"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
            <TextInput
              label="Twitter (Optionnel)"
              placeholder="URL twitter"
              icon="twitter"
              isFull
              type="text"
              id="registerTwitter"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <Button
              label="Retour"
              isLarge
              bold
              type="button"
              layout="bordered"
              onClick={() => {
                setCurrentPage(1);
                setError(undefined);
              }}
            />
            {error && <p className="text-red-700 "> {error} </p>}
            {loading ? (
              <LoaderSpinner size="sm" />
            ) : (
              <Button label="Valider" isLarge bold type="submit" />
            )}
          </div>
        </form>
      )}
    </div>
  );
}
