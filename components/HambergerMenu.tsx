import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { useAxios } from '../context/AxiosContext';
import { useAuth } from '../context/AuthContext';
import { Logout } from '../layout/app';

export default function HambergerMenu({
  close,
}: {
  close: () => void;
}): JSX.Element {
  const { push } = useRouter();
  const { authAxios } = useAxios();
  const { setAuthState } = useAuth();

  return (
    <div className="flex flex-col items-center justify-between py-5 overflow-y-hidden animate-enter-right fixed top-0 bottom-0 left-0 right-0 bg-white z-10">
      <span
        onClick={close}
        className="text-xl cursor-pointer absolute top-5 right-5 text-gray-800"
      >
        <FontAwesomeIcon icon={faTimes} />
      </span>
      <h2 className="text-xl inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-purple-1000 cursor-pointer">
        Find a musician
      </h2>

      <ul className="flex h-1/2 flex-col items-center justify-between">
        <li
          className={`mx-2 cursor-pointer `}
          onClick={() => {
            push('/musicians');
            close();
          }}
        >
          musiciens
        </li>
        <li
          className={`mx-2 cursor-pointer`}
          onClick={() => {
            push('/groups');
            close();
          }}
        >
          groupes
        </li>
        <li
          className={`mx-2 cursor-pointer`}
          onClick={() => {
            push('/events');
            close();
          }}
        >
          évènements
        </li>
      </ul>
      <ul className="text-gray-700 flex justify-around w-full">
        <li className="">Paramètres</li>
        <li
          onClick={() => {
            Logout(authAxios, setAuthState, push);
            close();
          }}
          className=""
        >
          Se déconnecter{' '}
        </li>
      </ul>
      <div className="w-full flex justify-center">
        <div className="flex items-center text-gray-500">
          <p className="mx-1 cursor-pointer">Nous contacter</p>
          <p className="mx-1">|</p>
          <p className="mx-1 cursor-pointer">Aide & services</p>
          <p className="mx-1 ">|</p>
          <p className="mx-1 cursor-pointer">FAQ</p>
        </div>
      </div>
    </div>
  );
}
