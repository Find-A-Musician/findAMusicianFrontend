import { IMenu } from './icons';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  icon: JSX.Element;
  rightComponents?: JSX.Element;
  hamburgerOnClick: () => void;
};

export default function Header({
  title,
  subtitle,
  icon,
  rightComponents,
  hamburgerOnClick,
}: Props) {
  return (
    <div className="flex justify-between items-center py-8 bg-white z-10">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center text-red-500 w-12 h-12 rounded-full bg-gray-100">
          {icon}
        </div>
        <div>
          <h2 className="font-medium">{title}</h2>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {rightComponents}{' '}
        <button
          onClick={hamburgerOnClick}
          className="text-gray-500 inline-block sm:hidden"
        >
          <IMenu />
        </button>
      </div>
    </div>
  );
}
