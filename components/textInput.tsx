import type { InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

export const INPUT_TYPES = [
  'password',
  'text',
  'search',
  'number',
  'email',
] as const;

type Icons = {
  [key: string]: {
    icon: IconDefinition;
    color: string;
  };
};

const ICONS_DEFINITION: Icons = {
  facebook: {
    icon: faFacebookSquare,
    color: 'text-blue-700',
  },
  instagram: {
    icon: faInstagram,
    color: 'text-pink-700',
  },
  twitter: {
    icon: faTwitter,
    color: 'text-cyan-500',
  },
  letter: {
    icon: faEnvelope,
    color: 'text-black',
  },
};

type InputTypes = typeof INPUT_TYPES[number];

type TextInputProps = {
  type: InputTypes;
  id: string;
  label: string;
};

export default function TextInput({
  type,
  id,
  label,
  ...props
}: TextInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'>) {
  return (
    <div className="flex flex-col items-start relative">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        className="px-2 py-1 border-2 shadow-sm outline-none rounded-2xl w-80 h-12 focus:border-red-800 focus:border-2 "
        type={type}
        id={id}
        {...props}
        // Add search icon there ..
        placeholder={
          type === 'search' ? `${props.placeholder}` : props.placeholder
        }
      />
      {/* <FontAwesomeIcon icon={faSearch} className="absolute top-10" /> */}
    </div>
  );
}
