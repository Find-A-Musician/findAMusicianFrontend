type Props = {
  title: string;
  children: JSX.Element;
};
export function ProfileSection({ title, children }: Props) {
  return (
    <div className="border rounded px-5 py-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <span className="text-gray-500">{children}</span>
    </div>
  );
}

export default ProfileSection;
