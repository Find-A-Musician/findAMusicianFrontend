import { createRef, useEffect } from 'react';

export default function useOnClickOutside(action: (...args: any) => void) {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        action();
      } else {
      }
    };

    window.addEventListener('mousedown', listener);
    window.addEventListener('touchstart', listener);

    return () => {
      window.removeEventListener('mousedown', listener);
      window.removeEventListener('touchstart', listener);
    };
  }, [ref, action]);

  return ref;
}
