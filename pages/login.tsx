import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { Profil, Token, setCookie } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Button from '../components/button';
import TextInput from '../components/textInput';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const axios = useAxios();
  const router = useRouter();

  async function Login(e: FormEvent<HTMLFormElement>) {
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
  }

  return (
    <>
      {!loading ? (
        <div>
          <p>romain.guar01@gmail.com</p>
          <p>romain123</p>
          <form onSubmit={(e) => Login(e)}>
            <TextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button label="Se connecter" layout="bordered" isLarge bold />
            <Button label="Se connecter" layout="filled" isLarge bold />
            {error && <p>{error}</p>}
          </form>
        </div>
      ) : (
        <div>
          <p> Authentification en cours ... </p>
        </div>
      )}
    </>
  );
}
