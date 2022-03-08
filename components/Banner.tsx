type Props = {
  title?: string;
  boldTitle?: string;
  subtitle?: string;
  imagePath?: string;
};
export default function Banner({
  title,
  boldTitle,
  subtitle,
  imagePath,
}: Props) {
  return (
    <div className="flex bg-gray-100 w-full rounded-xl">
      <div className="ml-10 my-8">
        <h2 className="text-2xl">{title}</h2>
        <h2 className="text-2xl font-bold">{boldTitle}</h2>
        <span className="block text-gray-500 mt-4">{subtitle}</span>
      </div>
      <div
        style={{
          backgroundImage: `url("${imagePath}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="flex-grow"
      ></div>
    </div>
  );
}
