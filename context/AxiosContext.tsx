import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { apiUrl } from '../config/Url';
import { AuthContext } from './AuthContext';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

type AxiosContextType = {
  publicAxios: AxiosInstance;
  authAxios: AxiosInstance;
};

const AxiosContext = createContext<AxiosContextType>({
  authAxios: axios.create(),
  publicAxios: axios.create(),
});

const { Provider } = AxiosContext;

function AxiosProvider({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: apiUrl,
  });

  const publicAxios = axios.create({
    baseURL: apiUrl,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (config.headers && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    },
  );

  async function refreshAuthLogic(failedRequest: any) {
    const data = {
      refreshToken: authContext?.getRefreshToken(),
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      data,
      url: `${apiUrl}/refresh_token`,
    };

    return axios(config)
      .then(
        async (
          tokenRefreshResponse: AxiosResponse<{ accessToken: string }>,
        ) => {
          // Set new header of the failedRequest
          failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.accessToken}`;

          // Set the new accessToken in the authContext
          authContext?.setAuthState({
            ...authContext.authState,
            accessToken: tokenRefreshResponse.data.accessToken,
          });

          return Promise.resolve();
        },
      )
      .catch((e) => {
        authContext?.setAuthState({
          refreshToken: '',
          accessToken: '',
          authenticated: false,
          profil: null,
        });
      });
  }

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {
    statusCodes: [403],
  });

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </Provider>
  );
}

function useAxios() {
  return useContext(AxiosContext);
}

export { AxiosContext, AxiosProvider, useAxios };
