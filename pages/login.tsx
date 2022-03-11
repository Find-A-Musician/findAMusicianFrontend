import { useState } from 'react';
import Image from 'next/image';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import PopUp from '../components/PopUp';
import useSwr from 'swr';
import { useAxios } from '../context/AxiosContext';
import { ITelescope, IPlayCircle } from '../components/icons';

type StatsInfoType = {
  data: {
    nbMusician: number;
    nbGroups: number;
    nbEvents: number;
  };
};

export default function Login(): JSX.Element {
  const { publicAxios } = useAxios();

  const [logginModal, setLogginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const { data, error } = useSwr<StatsInfoType>('/info', publicAxios.get);
  return (
    <div className="flex flex-col p-8 sm:p-14 sm:py-10 h-screen">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <ITelescope />
          <h2 className="font-bold text-xl">Find a musician</h2>
        </div>
        <div className="flex flex-wrap sm:items-center items-end flex-col sm:flex-row sm:gap-9">
          <button
            onClick={() => setRegisterModal(true)}
            className="text-gray-800 hover:text-black"
          >
            s'inscrire
          </button>
          <button
            onClick={() => setLogginModal(true)}
            className="font-bold text-red-500 hover:text-red-600"
          >
            se connecter
          </button>
        </div>
      </div>
      <div className="flex-grow flex gap-20 mx-auto items-center">
        <div className="w-[28rem] h-[28rem] hidden md:block">
          <Image
            src="/images/listening_music.webp"
            alt="listening to music"
            layout="responsive"
            width={512}
            height={512}
          />
        </div>
        <div>
          <div>
            <h2 className="text-5xl font-bold">
              Rejoint la <span className="text-red-500">communauté </span>
            </h2>
            <h2 className="text-5xl font-bold">
              de <span className="text-red-500">musiciens </span>de l’IMT
            </h2>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            <span className="text-gray-500">
              Trouve des musiciens qui jouent les même styles de musiques
            </span>
            <span className="text-gray-500">
              que toi, contacte-les, créez des groupes et participe aux
            </span>
            <span className="text-gray-500">évènements de l’école !</span>
          </div>
          <div className="flex gap-8 mt-16">
            <button
              onClick={() => setLogginModal(true)}
              className="border px-5 border-gray-800 text-gray-800 py-2.5 rounded hover:bg-gray-800 hover:text-white transition ease-in-out"
            >
              Commencer
            </button>
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-800 hover:text-black"
            >
              <IPlayCircle />
              voir la vidéo
            </a>
          </div>
        </div>
      </div>
      {logginModal && (
        <PopUp close={() => setLogginModal(false)}>
          <LoginModal
            onForgetPassword={() => {}}
            openRegisterModal={() => {
              setRegisterModal(true);
              setLogginModal(false);
            }}
          />
        </PopUp>
      )}
      {registerModal && (
        <PopUp
          close={() => {
            setRegisterModal(false);
          }}
        >
          <RegisterModal />
        </PopUp>
      )}
    </div>
  );
}
