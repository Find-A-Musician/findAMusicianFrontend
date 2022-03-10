import { createContext, Dispatch, SetStateAction } from 'react';

export const MenuContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: {} as Dispatch<SetStateAction<boolean>>,
});
