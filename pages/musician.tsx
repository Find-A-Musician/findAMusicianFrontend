import { useAuth } from '../context/AuthContext';

export default function Musician(): JSX.Element {
  const { getProfil } = useAuth();

  const profil = getProfil();

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
    </div>
  );
}
