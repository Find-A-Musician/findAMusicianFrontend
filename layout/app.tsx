import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/AuthContext';
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { pathname } = useRouter();
  const { getProfil } = useAuth();
  const profil = getProfil();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen w-full flex flex-col py-2">
      <div className="flex w-full items-center justify-between px-5">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-purple-1000  ">
          Find a musician
        </h2>

        {isAuthenticated() && (
          <ul className="flex items-center justify-between">
            <li
              className={`mx-2 cursor-pointer ${isLinkSelected(
                pathname,
                'musician',
              )}`}
            >
              musiciens
            </li>
            <li
              className={`mx-2 cursor-pointer ${isLinkSelected(
                pathname,
                'groups',
              )}`}
            >
              groupes
            </li>
            <li
              className={`mx-2 cursor-pointer ${isLinkSelected(
                pathname,
                'events',
              )}`}
            >
              évènements
            </li>
          </ul>
        )}

        {isAuthenticated() && (
          <div className="flex items-center">
            <div className="cursor-pointer relative mx-2">
              <FontAwesomeIcon icon={faBell} />
              <div className="text-white rounded-full bg-gradient-to-r from-red-600 via-red-800 to-purple-1000 text-sm absolute -top-2 -right-4 w-5 h-5 flex justify-center items-center ">
                <span>99</span>
              </div>
            </div>
            <div className="flex items-center mx-2">
              <div className="rounded-full w-7 h-7 bg-red-800 mx-2"></div>
              <p>Romain Guarinoni</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">{children}</div>
      <div className="w-full flex justify-center">
        <div className="flex items-center text-gray-500">
          <p className="mx-1 cursor-pointer">Nous contacter</p>
          <p className="mx-1 cursor-pointer">|</p>
          <p className="mx-1 cursor-pointer">Aide & services</p>
          <p className="mx-1 cursor-pointer">|</p>
          <p className="mx-1 cursor-pointer">FAQ</p>
        </div>
      </div>
    </div>
  );
}

function isLinkSelected(pathName: string, link: string): string {
  const path = pathName.split('/')[1];
  if (path === link) {
    return 'text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-purple-1000';
  } else {
    return '';
  }
}
//font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-800 to-purple-1000
