import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import useAxios from '../hooks/useAxios';
import axios from 'axios';
import { apiUrl } from '../config/Url';
type Instruments = {
  id: string;
  name: string;
}[];

type Genres = {
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
  genres?: Genres;
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
  getProfil: () => Profil;
  isAuthenticated: () => boolean;
  login: (email: string, password: string) => Promise<void | string>;
  logout: () => void;
  loadingProfil: boolean;
} | null;

const AuthContext = createContext<AuthContextType>(null);

const { Provider } = AuthContext;

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { authAxios, publicAxios } = useAxios();

  const [authState, setAuthState] = useState<AuthStateType>({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
    profil: null,
  });

  const [loadingProfil, setLoadinProfil] = useState(true);

  useEffect(() => {
    async function loadUserProfilFromCookie() {
      const refreshToken = Cookies.get('refreshToken');
      if (refreshToken && authState && publicAxios) {
        try {
          const {
            data: { accessToken },
          } = await publicAxios.post<{
            accessToken: string;
          }>('/refresh_token', { refreshToken });

          // Set the new accessToken in the cookie as Session cookie
          setCookie('accessToken', accessToken);

          // We have to set up our own axios call here bcs
          // the axios hook cannot access the auth context yet
          // We should fit it i think

          const { data: profil } = await axios({
            method: 'GET',
            url: `${apiUrl}/profil`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          setAuthState({
            refreshToken,
            accessToken: accessToken,
            authenticated: true,
            profil: profil,
          });
        } catch (err) {
          console.log(JSON.stringify(err));
          console.log('Auth Context Load Profil Error', err);
          // Need to redirect to the login page
        }
      }
      setLoadinProfil(false);
    }
    loadUserProfilFromCookie();
  }, []);

  async function login(email: string, password: string) {
    try {
      const {
        data: {
          token: { accessToken, refreshToken },
          musician,
        },
      } = await publicAxios.post<{
        token: Token;
        musician: Profil;
      }>('/login', {
        email,
        password,
      });

      console.log(musician);

      setAuthState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        authenticated: !!musician,
        profil: musician,
      });

      setCookie('refreshToken', refreshToken);

      setCookie('accessToken', accessToken);

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
    try {
      // Have to call our own axios call again bcs
      // authState is undefined in the axios hook here again

      await axios({
        method: 'delete',
        url: `${apiUrl}/logout`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      setAuthState({
        accessToken: '',
        refreshToken: '',
        authenticated: false,
        profil: null,
      });

      //clear cookie
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    } catch (err) {
      console.log('logout err');
      console.log(err);
    }
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

  function getProfil() {
    return authState.profil;
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        getAccessToken,
        getRefreshToken,
        getProfil,
        isAuthenticated,
        login,
        logout,
        loadingProfil,
      }}
    >
      {children}
    </Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function setCookie(key: 'accessToken' | 'refreshToken', value: String) {
  const options: {
    secure: boolean;
    sameSite: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None' | undefined;
    expires?: number;
  } = {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  };

  if (key === 'refreshToken') {
    options['expires'] = 360;
  }

  Cookies.set(key, value, options);
}

export { AuthContext, AuthProvider, useAuth };
