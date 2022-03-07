type Props = {
  label: string;
};

export default function NewButton({ label }: Props) {
  return (
    <button className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-400 transition ease-in-out duration-300">
      {label}
    </button>
  );
}
