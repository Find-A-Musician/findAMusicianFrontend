type Props = {
  title: string;
  subtitle?: string;
  icon: JSX.Element;
  rightComponents?: JSX.Element;
};

export default function Header({
  title,
  subtitle,
  icon,
  rightComponents,
}: Props) {
  return (
    <div className="flex justify-between items-center px-10 py-8">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center text-red-500 w-12 h-12 rounded-full bg-gray-100">
          {icon}
        </div>
        <div>
          <h2 className="font-medium">{title}</h2>
          <span className="text-sm text-gray-500">{subtitle}</span>
        </div>
      </div>
      {rightComponents}
    </div>
  );
}
