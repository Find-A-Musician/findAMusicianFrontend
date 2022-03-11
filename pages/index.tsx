import type { NextPage } from 'next';
import Login from './login';
import Musician from './musicians';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated()) {
    router.push('/musicians');
  } else {
    router.push('/login');
  }

  return <></>;
};

export default Home;
