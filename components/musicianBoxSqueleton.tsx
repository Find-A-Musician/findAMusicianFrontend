export default function MusicianBoxSkeleton() {
  return (
    <div className="h-40 w-96 shadow-complete rounded-lg flex">
      <div className="w-3/6 flex">
        <div className="m-auto bg-gray-300 animate-pulse rounded-full w-24 h-24"></div>
      </div>
      <div className="w-full flex flex-col justify-around items-start">
        <div className="bg-gray-300 animate-pulse h-5 w-4/6"></div>
        <div className="bg-gray-300 animate-pulse h-5 w-5/6 "></div>
        <div className="bg-gray-300 animate-pulse h-5 w-3/6 "></div>
        <div className="bg-gray-300 animate-pulse h-5 w-2/6 "></div>
      </div>
    </div>
  );
}
