import {
  faInstagram,
  faFacebookSquare,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const ICONS_DEFINITION = {
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
} as const;

export type ALL_ICONS = keyof typeof ICONS_DEFINITION;
