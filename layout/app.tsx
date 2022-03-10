import { useRouter } from 'next/router';
import { AuthStateType, useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useAxios } from '../context/AxiosContext';
import Cookies from 'js-cookie';
import type { AxiosInstance } from 'axios';
import Navbar from '../components/Navbar';
import { MenuContext } from '../context/MenuContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isAuthenticated() ? (
        <div className="flex h-screen bg-gray-100">
          <Navbar
            className={`absolute z-50 inset-0 animate-enter-right sm:w-80 sm:flex sm:static ${
              isMenuOpen ? '' : 'hidden'
            }`}
            setIsMenuOpen={setIsMenuOpen}
          />
          <div className="flex-grow w-screen max-h-screen overflow-hidden overflow-y-scroll bg-white rounded-t-lg px-4 sm:px-10 sm:mt-7 sm:mr-7">
            <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
              {children}
            </MenuContext.Provider>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}

export async function Logout(
  authAxios: AxiosInstance,
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>,
  push: (...args: any) => Promise<boolean>,
) {
  try {
    await authAxios.delete('/logout');

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    setAuthState({
      accessToken: '',
      refreshToken: '',
      profil: null,
      authenticated: false,
    });

    push('/login');
  } catch (err) {
    console.log('logout error', JSON.stringify(err));
  }
}
