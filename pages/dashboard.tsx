import { useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Dashboard(): JSX.Element {
  const { getProfil, setAuthState } = useAuth();
  const { authAxios } = useAxios();
  const router = useRouter();

  const profil = getProfil();

  async function Logout() {
    try {
      await authAxios.delete('/logout');

      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      setAuthState({
        accessToken: '',
        refreshToken: '',
        profil: null,
        authenticated: false,
      });

      router.push('/login');
    } catch (err) {
      console.log('logout error', JSON.stringify(err));
    }
  }

  return (
    <div>
      <h1> Welcome {profil?.givenName} </h1>
      <p>Vous jouer :</p>
      <ul>
        {profil?.instruments.map(({ id, name }) => (
          <li key={id}> {name} </li>
        ))}
      </ul>
      <p>Styles : </p>
      <ul>
        {profil?.genres.map(({ id, name }) => (
          <li key={id}> {name} </li>
        ))}
      </ul>
      <p>
        Vous êtes en {profil?.promotion} à {profil?.location}{' '}
      </p>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
}
