import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <h1>Page introuvable</h1>
      <ul>
        <li>
          <Link href="/">
            <a>Home Page</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
