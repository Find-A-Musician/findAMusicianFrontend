type Props = {
  label: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function NewButton({
  label,
  className,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={`px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-400 transition ease-in-out duration-300 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
