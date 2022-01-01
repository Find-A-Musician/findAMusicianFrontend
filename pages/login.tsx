import { FormEvent, useEffect, useState, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();

  const { authAxios } = useAxios();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const login = await auth?.login(email, password);
    } catch (err) {
      console.log('login has failed');
      console.log(err);
      setError(JSON.stringify(err));
    }
  }

  useEffect(() => {
    async function genres() {
      const { data } = await authAxios('/genres');
      console.log(data);
    }

    if (auth?.isAuthenticated()) {
      genres();
    }
  }, [auth?.isAuthenticated()]);

  return (
    <>
      {auth?.loadingProfil ? <p>loading profil ...</p> : null}
      {!auth?.loadingProfil &&
      !auth?.isAuthenticated() &&
      !auth?.authState.profil ? (
        <div>
          <p>romain.guar01@gmail.com</p>
          <p>romain123</p>
          <form onSubmit={(e) => submitForm(e)}>
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
              auth.logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
