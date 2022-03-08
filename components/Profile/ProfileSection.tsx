type Props = {
  children: JSX.Element;
};
export default function ProfileSection({ children }: Props) {
  return (
    <div className="border rounded px-5 py-6">
      <h2 className="text-xl font-bold mb-4">Information</h2>
      <span className="text-gray-500">{children}</span>
    </div>
  );
}
