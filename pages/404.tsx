import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <h2 className="text-5xl font-bold text-red-500 mb-8">
        404 something went wrong
      </h2>
      <Image
        src="/images/404.jpg"
        alt="404"
        width={500}
        height={(500 * 813) / 1006}
        className="rounded"
      />
      <span className="italic text-xl text-gray-500">
        Hey ! Qu&apos;est-ce que tu fais là ? Retourne sur{' '}
        <Link href="/musicians" passHref>
          <a className="text-blue-500 hover:underline">une page qui existe !</a>
        </Link>
      </span>
    </div>
  );
}
