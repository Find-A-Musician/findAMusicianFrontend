import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  text: string;
  href: string;
  icon: JSX.Element;
};

export default function NavItem({ text, href, icon }: Props) {
  const router = useRouter();

  let selected = router.pathname === href;

  return (
    <Link href={href} passHref>
      <a
        className={`flex gap-3 items-center text-${
          selected ? 'red' : 'gray'
        }-500 font-${selected ? 'bold' : 'medium'}`}
      >
        {icon}
        {text}
      </a>
    </Link>
  );
}
