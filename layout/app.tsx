import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthStateType, useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { useAxios } from '../context/AxiosContext';
import Cookies from 'js-cookie';
import type { AxiosInstance } from 'axios';
import HambergerMenu from '../components/hambergerMenu';
import Navbar from '../components/Navbar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { pathname, push } = useRouter();
  const { getProfil, setAuthState, isAuthenticated } = useAuth();
  const { authAxios } = useAxios();

  const [settingModal, setSettingModal] = useState(false);
  const [hambergerMenu, setHambergerMenu] = useState(false);

  const settingModalRef = useOnClickOutside(() => {
    setSettingModal(false);
  });

  const profil = getProfil();

  return (
    <>
      {isAuthenticated() ? (
        <div className="flex h-screen bg-gray-100">
          <Navbar />
          <div className="flex-grow bg-white rounded-t-lg mt-7 mr-7">
            {children}
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}

function isLinkSelected(pathName: string, link: string): string {
  const path = pathName.split('/')[1];
  if (path === link) {
    return `text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-purple-1000`;
  } else {
    return '';
  }
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
