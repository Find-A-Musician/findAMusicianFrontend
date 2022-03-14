import RegisterModal from '../RegisterModal';
import { Meta } from '@storybook/react';
import PopUp from '../PopUp';

export default {
  title: 'Modal/Register',
  component: RegisterModal,
} as Meta;

export const Primary = () => {
  return (
    <PopUp close={() => {}}>
      <RegisterModal />
    </PopUp>
  );
};
