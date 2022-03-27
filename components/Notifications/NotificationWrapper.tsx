import { ICheck, IClose } from '../icons';

type Props = {
  title: JSX.Element;
  description?: string;
  close: () => void;
  /**gradient class e.g: bg-gradient-to-r from-green-500 to-emerald-400 */
  gradientClass: string;
  /**Can only accept if hasChoice is true */
  hasChoice?: boolean;
  /**Can only accept if hasChoice is true */
  accept?: () => void;
};

export function NotificationWrapper({
  title,
  description,
  close,
  gradientClass,
  hasChoice,
  accept,
}: Props) {
  return (
    <div
      className={`text-white rounded px-6 py-5 flex items-center gap-5 ${gradientClass}`}
    >
      <div className="grow">
        <div className="text-xl">{title}</div>
        {description && (
          <span className="mt-3 block text-gray-100">{description}</span>
        )}
      </div>
      <div className="flex gap-4">
        {hasChoice && (
          <button onClick={accept}>
            <ICheck size="40px" />
          </button>
        )}
        <button onClick={close}>
          <IClose size="40px" />
        </button>
      </div>
    </div>
  );
}

export default NotificationWrapper;
