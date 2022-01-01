import React, { createContext, useContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { AuthContext } from '../context/AuthContext';
import { apiUrl } from '../config/Url';

export default function useAxios() {
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
        console.log('PUT THE HEADER DUDE ');
        config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
      } else {
        console.log('WHAT IS THE FUCK');
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

  return { publicAxios, authAxios, refreshAuthLogic };
}
