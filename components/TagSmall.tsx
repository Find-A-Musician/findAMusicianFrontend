import { useState } from 'react';

type Props = {
  label: string;
  description: string;
};

export default function TagSmall({ label, description }: Props) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="relative z-0">
      <span
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="text-white text-xs bg-green-500 justify-center items-center px-1 py rounded"
      >
        {label}
      </span>
      {isHover && (
        <div className="text-sm text-center flex flex-col items-center text-grey-500 w-36 bg-white border rounded absolute bottom-6 left-1/2 -translate-x-1/2">
          {description}
        </div>
      )}
    </div>
  );
}
