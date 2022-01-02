import { FormEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { Profil, Token, setCookie } from '../context/AuthContext';
import Cookies from 'js-cookie';
export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();
  const axios = useAxios();

  async function Login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
    } catch (err) {
      setError(JSON.stringify(err));
    }
  }

  async function Logout() {
    try {
      await axios.authAxios.delete('/logout');

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      auth.setAuthState({
        accessToken: '',
        refreshToken: '',
        profil: null,
        authenticated: false,
      });
    } catch (err) {
      console.log('logout error', JSON.stringify(err));
    }
  }

  if (auth.loadingProfil) {
    return <p>Loading profil ...</p>;
  }

  return (
    <>
      {!auth.isAuthenticated() ? (
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
          <div>
            <h1>
              {auth.authState.profil?.givenName}{' '}
              {auth.authState.profil?.familyName}
            </h1>
            <div>
              {' '}
              {auth.authState.profil?.genres?.map(({ id, name }) => (
                <p key={id}> play {name}</p>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              // auth?.logout();
              Logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
