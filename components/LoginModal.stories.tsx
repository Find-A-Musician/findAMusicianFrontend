import { Meta } from '@storybook/react';
import LoginModal from './LoginModal';
import PopUp from './PopUp';

export default {
  title: 'Modal/Login',
  component: LoginModal,
} as Meta;

export const Primary = () => {
  return (
    <PopUp close={() => {}}>
      <LoginModal onForgetPassword={() => {}} />
    </PopUp>
  );
};
