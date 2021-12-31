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
      console.log('login hes been successfull');
    } catch (err) {
      console.log('login has failed');
      console.log(err);
      setError(JSON.stringify(err));
    }
  }

  return (
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

      <p>Profil :</p>
      <p>{JSON.stringify(auth?.authState.profil)}</p>

      <p
        onClick={() => {
          auth?.logout();
        }}
      >
        Logout
      </p>
    </div>
  );
}
