import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  text: string;
  href: string;
  icon: JSX.Element;
  onClick?: () => void;
};

export default function NavItem({ text, href, icon, onClick }: Props) {
  const router = useRouter();

  let selected = router.pathname === href;

  return (
    <Link href={href} passHref>
      <a
        className={`flex gap-3 items-center ${
          selected
            ? 'text-red-500 font-bold hover:text-red-600'
            : 'text-gray-500 font-medium hover:text-gray-600'
        }`}
        onClick={onClick}
      >
        {icon}
        {text}
      </a>
    </Link>
  );
}
