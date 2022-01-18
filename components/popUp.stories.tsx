import PopUp from './popUp';
import { Meta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Layout/Popup',
  component: PopUp,
  argTypes: {
    text: {
      type: 'string',
      defaultValue: 'This is a Pop Up',
    },
  },
} as Meta;

export const BasicPopup = ({ text }: { text: string }) => {
  return (
    <PopUp>
      <div className="bg-white min-w-0 h-10 flex items-center justify-center p-5 ">
        <h1> {text} </h1>
      </div>
    </PopUp>
  );
};
