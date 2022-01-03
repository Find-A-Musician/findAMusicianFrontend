import type { NextPage } from 'next';
import Login from './login';
import Musician from './musician';
import { useAuth } from '../context/AuthContext';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Musician />;
  }

  return <Login />;
};

export default Home;
