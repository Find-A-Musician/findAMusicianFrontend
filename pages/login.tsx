import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAxios } from '../context/AxiosContext';
import { useRouter } from 'next/router';
import login_illustration from '../assets/login_illustration.svg';
import Image from 'next/image';
import Button from '../components/button';
import StatsInfo from '../components/statsInfo';
import LoginModal from '../components/loginModal';
import PopUp from '../components/popUp';

export default function Login(): JSX.Element {
  const [logginModal, setLogginModal] = useState(false);

  return (
    <div>
      <div className="w-full h-96 my-28 flex justify-around items-center ">
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
        />
      </div>
      <div className="flex w-full items-center justify-around my-36">
        <StatsInfo label="musiciens inscrits" number={999} />
        <StatsInfo label="groupes" number={999} />
        <StatsInfo label="évènements en cours" number={999} />
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
