import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { Profil, Token, setCookie } from '../context/AuthContext';
import { useRouter } from 'next/router';

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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Envoyer</button>
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
