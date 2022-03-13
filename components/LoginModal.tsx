import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { setCookie, useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { Input } from './DataEntry';
import NewButton from './NewButton';
import LoaderSpinner from './LoaderSpinner';
import { Musician } from '../types';
import { Token } from '../types/api';

type Props = {
  onForgetPassword: () => void;
  openRegisterModal: () => void;
};

export default function LoginModal({
  onForgetPassword,
  openRegisterModal,
}: Props): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const axios = useAxios();
  const router = useRouter();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    setError('');
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: {
          token: { accessToken, refreshToken },
          musician,
        },
      } = await axios?.publicAxios.post<{
        musician: Musician;
        token: Token;
      }>('/login', { email, password });

      // Set the auth context
      auth.setAuthState({
        accessToken,
        refreshToken,
        profil: musician,
        authenticated: true,
      });

      // set the cookie
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);

      if (router.query.redirectTo) {
        router.push(router.query.redirectTo as string);
      } else {
        router.push('/musicians');
      }
    } catch (err) {
      setError(JSON.stringify(err));
    }
    setLoading(false);
    setPassword('');
  }

  return (
    <div className="flex flex-col justify-around p-10 sm:w-96 w-80 rounded-md gap-6 bg-white">
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <h2 className="text-lg font-bold text-gray-800">Se connecter</h2>
        <div className="flex flex-col gap-4">
          <Input
            id="emailInputLogin"
            label="Email"
            displayLabel
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="passwordInputLogin"
            type="password"
            label="Mot de passe"
            displayLabel
            placeholder="Mot de passe"
            autoComplete="password"
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <span className="-mt-4 text-red-500 text-sm">
            Email ou mot de passe incorrect
          </span>
        )}

        {loading ? (
          <LoaderSpinner size="sm" />
        ) : (
          <NewButton type="submit" label="Connexion" className="mt-4 rounded" />
        )}
      </form>
      <span className="text-sm text-gray-400">
        Pas encore de compte ?{' '}
        <button
          className="text-blue-500 hover:underline ml-1"
          onClick={openRegisterModal}
        >
          inscris-toi!
        </button>
      </span>
    </div>
  );
}
