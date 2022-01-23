import { useState } from 'react';
import login_illustration from '../assets/login_illustration.svg';
import Image from 'next/image';
import Button from '../components/button';
import StatsInfo from '../components/statsInfo';
import LoginModal from '../components/loginModal';
import RegisterModal from '../components/registerModal';
import PopUp from '../components/popUp';
import useSwr from 'swr';
import { useAxios } from '../context/AxiosContext';

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
    <div>
      <div className="w-full h-96 my-10 md:my-40 flex md:flex-col lg:flex-row justify-around items-center ">
        <div className="h-60 max-w-xl w-full flex flex-col justify-between items-start ">
          <h2 className="text-3xl md:text-left text-center">
            Rejoins la communauté de musiciens de <br />
            <strong className="text-red-700 font-bold">
              l’IMT Lille Douai
            </strong>
          </h2>
          <p className="text-xl md:text-left text-center">
            Trouve des musiciens qui jouent les mêmes styles de musiques que
            toi, contacte-les, crées des groupes et participe aux évènements de
            l’école.
          </p>
          <div className="flex flex-wrap w-full items-center md:justify-between justify-center">
            <Button
              label="S'inscrire"
              layout="filled"
              bold
              isLarge
              onClick={() => setRegisterModal(true)}
            />
            <Button
              label="Se connecter"
              layout="bordered"
              bold
              isLarge
              onClick={() => setLogginModal(true)}
            />
          </div>
        </div>
        <div className="hidden md:block lg:w-128 md:w-96 h-96 md:my-10 lg:my-0">
          <Image
            src={login_illustration}
            alt="Musiciens illustrations"
            layout="responsive"
            // width={1000}
            // height={500}
            priority
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full items-center justify-around mt-36">
        <StatsInfo
          label="musiciens inscrits"
          number={data?.data.nbMusician || null}
        />
        <StatsInfo label="groupes" number={data?.data.nbGroups || null} />
        <StatsInfo
          label="évènements en cours"
          number={data?.data.nbEvents || null}
        />
      </div>
      {logginModal && (
        <PopUp close={() => setLogginModal(false)}>
          <LoginModal onForgetPassword={() => {}} />{' '}
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
