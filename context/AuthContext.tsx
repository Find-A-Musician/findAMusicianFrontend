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
      if (refreshToken) {
        console.log('refresh token', refreshToken);
        try {
          const {
            data: { accessToken },
          } = await publicAxios.post<{
            accessToken: string;
          }>('/refresh_token', { refreshToken });
          setAuthState({
            refreshToken,
            accessToken: accessToken || '',
            authenticated: true,
            profil: null,
          });

          console.log('accessToken');
          console.log(accessToken);

          // We have to get our own axios call bcs the axios hook cannot access the auth context yet
          // We should fit it i think
          const userProfilResponse = await axios({
            method: 'GET',
            url: `${apiUrl}/profil`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log(userProfilResponse);

          setAuthState({
            ...authState,
            profil: userProfilResponse?.data || null,
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
    console.log('is axios context undefines ? ', publicAxios, authAxios);
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

      console.log('accesstoken', accessToken);
      console.log('refrsh', refreshToken);
      console.log('musician', musician);
      console.log('auth', !!musician);

      setAuthState({
        accessToken: accessToken || '',
        refreshToken: refreshToken || '',
        authenticated: !!musician,
        profil: musician || null,
      });

      // Refresh cookie expires in 360 days
      Cookies.set('refreshToken', getRefreshToken(), {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: 360,
      });

      const currentDate = new Date();

      // Access token expires in 5 min
      Cookies.set('accessToken', getAccessToken(), {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
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
    await authAxios.delete('/logout');

    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
      profil: null,
    });

    //clear cookie

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
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

export { AuthContext, AuthProvider, useAuth };
