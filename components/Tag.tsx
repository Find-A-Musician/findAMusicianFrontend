type Props = {
  text: string;
  color?: string;
};

export default function Tag({ text, color = 'red' }: Props) {
  return (
    <span
      className={`py-1 px-2.5 
                 bg-${color}-100 border border-${color}-500 rounded-full
                 text-sm text-${color}-500`}
    >
      {text}
    </span>
  );
}
