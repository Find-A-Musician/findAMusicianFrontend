import RegisterModal from './registerModal';
import { Meta } from '@storybook/react';
import PopUp from './popUp';

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
