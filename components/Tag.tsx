type Props = {
  text: string;
};

export default function Tag({ text }: Props) {
  return (
    <span
      className="py-1 px-2.5 
                 bg-red-100 border border-red-500 rounded-full
                 text-sm text-red-500"
    >
      {text}
    </span>
  );
}
