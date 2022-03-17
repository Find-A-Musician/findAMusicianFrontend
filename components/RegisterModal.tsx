import { FormEvent, useState } from 'react';
import { Instrument, Genre } from '../types';
import { Dropdown, Input } from './DataEntry';
import { Options } from './DataEntry/Dropdown';
import NewButton from './NewButton';
import { useAxios } from '../context/AxiosContext';
import { setCookie, useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useGetGenres, useGetInstruments } from '../api';

enum RegisterError {
  'name' = 'Vous devez choisir un prénom et un nom',
  'passwordNotEqual' = 'Les mots de passes ne correspondent pas',
  'passwordNotLongEnough' = 'Ton mot de passe doit contenir au moins 8 caractères',
  'genre' = 'Choissis au moins un genre',
  'instrument' = 'Choissis au moins un instrument',
  'server' = "Une erreur inconnue s'est produite, réessaye plus tard",
  'email' = "L'email est dejà utilisé",
}

const promotions = ['L1', 'L2', 'L3', 'M1', 'M2', ''] as const;

const locations = ['Douai', 'Lille', ''] as const;

export default function RegisterModal() {
  const { publicAxios } = useAxios();
  const { setAuthState } = useAuth();
  const router = useRouter();

  // Notification
  const notificationError = () => toast.error("Le compte n'a pas pu être créé");

  // First page state
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordFirst, setPasswordFirst] = useState('');
  const [passwordSecond, setPasswordSecond] = useState('');
  const [promotion, setPromotion] = useState<typeof promotions[number]>('');
  const [location, setLocation] = useState<typeof locations[number]>('');

  // Second page state
  const [genres, setGenres] = useState<Genre[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [facebookUrl, setFacebookUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');

  const [error, setError] = useState<RegisterError>();

  const [currentPage, setCurrentPage] = useState(1);

  const { data: genresList } = useGetGenres();
  const { data: instrumentsList } = useGetInstruments();

  function submitFirstPage(e: FormEvent) {
    e.preventDefault();
    if (!givenName || !familyName) return setError(RegisterError.name);
    setError(undefined);
    setCurrentPage(currentPage + 1);
  }

  function submitSecondPage(e: FormEvent) {
    e.preventDefault();
    if (!email) return setError(RegisterError.email);
    setError(undefined);
    setCurrentPage(currentPage + 1);
  }

  function submitThirdPage(e: FormEvent) {
    e.preventDefault();
    if (passwordFirst.length < 8)
      return setError(RegisterError.passwordNotLongEnough);
    if (passwordFirst !== passwordSecond)
      return setError(RegisterError.passwordNotEqual);
    setError(undefined);
    setCurrentPage(currentPage + 1);
  }

  function submitSixPage(e: FormEvent) {
    e.preventDefault();
    if (!instruments.length) return setError(RegisterError.instrument);
    if (!genres.length) return setError(RegisterError.genre);
    setError(undefined);
    setCurrentPage(currentPage + 1);
  }

  function submitSevenPage(e: FormEvent) {
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
    publicAxios
      .post('/register', {
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
            router.push('/musicians');
          }
        },
      )
      .catch((err) => {
        console.log(err);
        notificationError();
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
      });
  }

  return (
    <div className="flex flex-col justify-around p-10 sm:w-96 w-80 rounded-md gap-6 bg-white">
      <h2 className="text-lg font-bold text-gray-800">Inscris toi !</h2>
      {currentPage === 1 && (
        <form
          onSubmit={(e) => submitFirstPage(e)}
          className="flex flex-col gap-4"
        >
          <Input
            id="nameinput"
            label="Prénom"
            displayLabel
            placeholder="Thomas"
            autoComplete="given-name"
            required
            className="w-full"
            value={givenName}
            onChange={(e) => setGivenName(e.target.value)}
          />
          <Input
            id="lastnameinput"
            label="Nom"
            displayLabel
            placeholder="Bernard"
            autoComplete="family-name"
            required
            className="w-full"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
          />
          {error && (
            <span className="-mt-2 text-sm text-red-500 "> {error} </span>
          )}
          <NewButton type="submit" label="Suivant" className="mt-4 rounded" />
        </form>
      )}

      {currentPage === 2 && (
        <form
          onSubmit={(e) => submitSecondPage(e)}
          className="flex flex-col gap-4"
        >
          <Input
            id="emailinput"
            label="Email"
            displayLabel
            placeholder="myemail@findamusician.com"
            required
            autoComplete="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="phone"
            label="Téléphone (optionnel)"
            displayLabel
            type="tel"
            pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
            placeholder="06 66 66 66 66"
            autoComplete="family-name"
            className="w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && (
            <span className="-mt-2 text-sm text-red-500 "> {error} </span>
          )}
          <div className="flex flex-col">
            <NewButton type="submit" label="Suivant" className="mt-4 rounded" />
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </form>
      )}

      {currentPage === 3 && (
        <form
          onSubmit={(e) => submitThirdPage(e)}
          className="flex flex-col gap-4"
        >
          <Input
            id="password"
            label="Mot de passe"
            type="password"
            displayLabel
            required
            autoComplete="password"
            className="w-full"
            value={passwordFirst}
            onChange={(e) => setPasswordFirst(e.target.value)}
          />
          <Input
            id="passwordconfirm"
            label="Confirmer le mot de passe"
            displayLabel
            type="password"
            autoComplete="password"
            className="w-full"
            value={passwordSecond}
            onChange={(e) => setPasswordSecond(e.target.value)}
          />
          {error && (
            <span className="-mt-2 text-sm text-red-500 "> {error} </span>
          )}
          <div className="flex flex-col">
            <NewButton type="submit" label="Suivant" className="mt-4 rounded" />
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </form>
      )}

      {currentPage === 4 && (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setLocation('Douai');
              setCurrentPage(currentPage + 1);
            }}
            className={`w-full p-4 rounded ${
              location === 'Douai'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-50 border hover:bg-gray-100'
            }`}
          >
            Douai
          </button>
          <button
            onClick={() => {
              setLocation('Lille');
              setCurrentPage(currentPage + 1);
            }}
            className={`w-full p-4 rounded ${
              location === 'Lille'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-50 border hover:bg-gray-100'
            }`}
          >
            Lille
          </button>

          <div className="flex flex-col">
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </div>
      )}

      {currentPage === 5 && (
        <div className="flex flex-col gap-4">
          {promotions.map((promo, index) => {
            if (promo.length)
              return (
                <button
                  key={index}
                  onClick={() => {
                    setPromotion(promo);
                    setCurrentPage(currentPage + 1);
                  }}
                  className={`w-full p-3 rounded ${
                    promotion === promo
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-50 border hover:bg-gray-100'
                  }`}
                >
                  {promo}
                </button>
              );
          })}

          <div className="flex flex-col">
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </div>
      )}

      {currentPage === 6 && (
        <form
          onSubmit={(e) => submitSixPage(e)}
          className="flex flex-col gap-4"
        >
          <Dropdown
            label="Instrument"
            options={
              instrumentsList?.map((instrument) => {
                return { label: instrument.name, value: instrument };
              }) as Options<Instrument>[]
            }
            selected={instruments}
            setSelected={setInstruments}
            disableBackgroundColor
            className="w-full"
          />

          <Dropdown
            label="Genres"
            options={
              genresList?.map((genre) => {
                return { label: genre.name, value: genre };
              }) as Options<Genre>[]
            }
            selected={genres}
            setSelected={setGenres}
            disableBackgroundColor
            className="w-full"
          />

          {error && (
            <span className="-mt-2 text-sm text-red-500 "> {error} </span>
          )}
          <div className="flex flex-col">
            <NewButton type="submit" label="Suivant" className="mt-4 rounded" />
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </form>
      )}

      {currentPage === 7 && (
        <form
          onSubmit={(e) => submitSevenPage(e)}
          className="flex flex-col gap-4"
        >
          <Input
            id="facebook"
            label="Facebook (optionnel)"
            displayLabel
            className="w-full"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
          />

          <Input
            id="instagram"
            label="Instagram (optionnel)"
            displayLabel
            className="w-full"
            value={instagramUrl}
            onChange={(e) => setInstagramUrl(e.target.value)}
          />

          <Input
            id="twitter"
            label="Twitter (optionnel)"
            displayLabel
            className="w-full"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
          />

          <div className="flex flex-col">
            <NewButton
              type="submit"
              label="S'inscrire"
              className="mt-4 rounded"
            />
            <NewButton
              label="Retour"
              className="mt-4 rounded"
              secondary
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setError(undefined);
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
}
