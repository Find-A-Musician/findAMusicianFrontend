import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { AxiosContext } from './AxiosContext';
import { rejects } from 'assert';

type Instruments = {
  id: string;
  name: string;
}[];

type Token = {
  accessToken: string;
  refreshToken: string;
};

type Profil = {
  id?: string;
  email: string;
  givenName?: string;
  familyName?: string;
  phone?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  promotion?: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  location?: 'Douai' | 'Lille';
  instruments?: Instruments;
} | null;

type AuthStateType = {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
  profil: Profil;
};

type AuthContextType = {
  authState: AuthStateType;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
  isAuthenticated: () => boolean;
  logout: () => void;
} | null;

const AuthContext = createContext<AuthContextType>(null);

const { Provider } = AuthContext;

function AuthProvider({ children }: { children: React.ReactNode }) {
  const axiosContext = useContext(AxiosContext);

  const [authState, setAuthState] = useState<AuthStateType>({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
    profil: null,
  });

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    console.log('tokens', accessToken, refreshToken);
  }, []);

  async function login(email: string, password: string) {
    try {
      const loginReponse = await axiosContext?.publicAxios.post<{
        token: Token;
        musician: Profil;
      }>('/login', {
        email,
        password,
      });

      setAuthState({
        accessToken: loginReponse?.data.token.accessToken || '',
        refreshToken: loginReponse?.data.token.refreshToken || '',
        authenticated: !!loginReponse?.data.musician,
        profil: loginReponse?.data.musician || null,
      });

      return new Promise<void>((resolve) => {
        resolve();
      });
    } catch (err) {
      return new Promise<string>((reject) => {
        reject(JSON.stringify(err));
      });
    }
  }

  async function logout() {
    await axiosContext?.authAxios.delete('/logout');

    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
      profil: null,
    });
  }

  function getAccessToken() {
    return authState.accessToken;
  }

  function getRefreshToken() {
    return authState.refreshToken;
  }

  function isAuthenticated() {
    return authState.authenticated;
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        getAccessToken,
        getRefreshToken,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}

export { AuthContext, AuthProvider };
