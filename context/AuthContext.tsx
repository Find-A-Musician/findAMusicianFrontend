import React, { useState, createContext, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
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

export type Token = {
  accessToken: string;
  refreshToken: string;
};

export type Profil = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  phone?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  instagram_url?: string | null;
  promotion: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  location: 'Douai' | 'Lille';
  instruments: Instruments;
  genres: Genres;
} | null;

export type AuthStateType = {
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
  loadingProfil: boolean;
};

const AuthContext = createContext<AuthContextType>({
  authState: {} as AuthStateType,
  setAuthState: {} as React.Dispatch<React.SetStateAction<AuthStateType>>,
  getAccessToken: () => {
    return '';
  },
  getRefreshToken: () => {
    return '';
  },
  getProfil: () => {
    return {} as Profil;
  },
  isAuthenticated: () => {
    return false;
  },
  loadingProfil: true,
});

const { Provider } = AuthContext;

function AuthProvider({ children }: { children: React.ReactNode }) {
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
        try {
          const {
            data: { accessToken },
          } = await axios({
            method: 'POST',
            url: `${apiUrl}/refresh_token`,
            data: {
              refreshToken,
            },
          });

          // Set the new accessToken in the cookie as Session cookie
          setCookie('accessToken', accessToken);

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

export function setCookie(key: 'accessToken' | 'refreshToken', value: String) {
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
