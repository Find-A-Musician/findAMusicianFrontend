import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { FormEvent, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AxiosContext } from '../context/AxiosContext';

export default function Login(): JSX.Element {
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResponse = await axiosContext?.publicAxios.post('/login', {
        email,
        password,
      });

      console.log(loginResponse?.data);
      console.log(loginResponse?.headers);
    } catch (err) {
      setError(JSON.stringify(err));
    }
  }

  return (
    <div>
      {!loading && (
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
      )}
      {loading && <p>Loading . . . </p>}
    </div>
  );
}
