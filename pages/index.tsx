import type { NextPage } from 'next';
import Login from './login';
import Dashboard from './dashboard';
import { useAuth } from '../context/AuthContext';

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Dashboard />;
  }

  return <Login />;
};

export default Home;
