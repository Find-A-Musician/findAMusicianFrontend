import { IEdit } from '../icons';

type Props = {
  title: string;
  children: JSX.Element;
  canBeModified?: boolean;
  modifyOnClick?: () => void;
};

export function DetailsSection({
  title,
  children,
  canBeModified,
  modifyOnClick,
}: Props) {
  return (
    <div className="border rounded px-5 py-6">
      <div className="flex items-center mb-4 justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {canBeModified && (
          <button onClick={modifyOnClick} className="mr-4 text-gray-500">
            <IEdit />
          </button>
        )}
      </div>
      <span className="text-gray-500">{children}</span>
    </div>
  );
}

export default DetailsSection;
