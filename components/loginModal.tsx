import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Profil, setCookie, Token, useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import TextInput from './textInput';
import Button from './button';

export default function LoginModal({
  onForgetPassword,
}: {
  onForgetPassword: () => void;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const axios = useAxios();
  const router = useRouter();

  async function Login(e: FormEvent<HTMLFormElement>) {
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
        musician: Profil;
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
        router.push('/musician');
      }
    } catch (err) {
      setError(JSON.stringify(err));
    }
    setLoading(false);
    setPassword('');
  }

  return (
    <form
      onSubmit={Login}
      className="flex flex-col items-center justify-around py-3 w-96 rounded-2xl h-96 border-2 bg-white"
    >
      <h2 className="text-red-800 font-black text-xl">Connecte toi !</h2>
      {error && <p className="text-red-600">Email ou mot de passe incorrect</p>}
      <div className="flex flex-col items-start">
        <label htmlFor="emailInputLogin" className="font-bold">
          Email
        </label>
        <TextInput
          type="email"
          id="emailInputLogin"
          placeholder="Entrez votre email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="passwordInputLogin" className="font-bold">
          Mot de passe
        </label>
        <TextInput
          type="password"
          id="passwordInputLogin"
          placeholder="Entrez votre mot de passe"
          autoComplete="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          onClick={onForgetPassword}
          className="text-gray-500 text-sm cursor-pointer self-center m-1"
        >
          Mot de passe oublié ?
        </p>
      </div>

      <Button isLarge type="submit" label="Connexion" bold />
    </form>
  );
}
