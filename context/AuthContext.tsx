import React, { useState, createContext } from 'react';

type AuthStateType = {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
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
  const [authState, setAuthState] = useState<AuthStateType>({
    accessToken: '',
    refreshToken: '',
    authenticated: false,
  });

  function logout() {
    // Need to call the API there

    setAuthState({
      accessToken: '',
      refreshToken: '',
      authenticated: false,
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
