import { useState } from 'react';
import login_illustration from '../assets/login_illustration.svg';
import Image from 'next/image';
import Button from '../components/button';
import StatsInfo from '../components/statsInfo';
import LoginModal from '../components/loginModal';
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

  const { data, error } = useSwr<StatsInfoType>('/info', publicAxios.get);
  console.log(data);
  return (
    <div>
      <div className="w-full h-96 my-40 flex justify-around items-center ">
        <div className="h-60 max-w-xl w-full flex flex-col justify-between items-start ">
          <h2 className="text-3xl">
            Rejoins la communauté de musiciens de <br />
            <strong className="text-red-700 font-bold">
              l’IMT Lille Douai
            </strong>
          </h2>
          <p className="text-xl">
            Trouve des musiciens qui jouent les même styles de musiques que toi,
            contacte-les, créez des groupes et participent aux évènements de
            l’école.
          </p>
          <div className="flex w-full items-center justify-between">
            <Button label="S'inscrire" layout="filled" bold isLarge />
            <Button
              label="Se connecter"
              layout="bordered"
              bold
              isLarge
              onClick={() => setLogginModal(true)}
            />
          </div>
        </div>
        <Image
          src={login_illustration}
          alt="Musiciens illustrations"
          layout="fixed"
          width={1000}
          height={500}
          priority
        />
      </div>
      <div className="flex w-full items-center justify-around my-36">
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
          {' '}
          <LoginModal onForgetPassword={() => {}} />{' '}
        </PopUp>
      )}
    </div>
  );
}
