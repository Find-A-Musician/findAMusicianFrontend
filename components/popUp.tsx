import React from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';

export default function PopUp({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) {
  const ref = useOnClickOutside(close);

  return (
    <div className="fixed z-50  top-0 left-0 right-0 bottom-0 bg-transparent/30">
      <div className="w-full h-full flex items-center justify-center" ref={ref}>
        {children}
      </div>
    </div>
  );
}
