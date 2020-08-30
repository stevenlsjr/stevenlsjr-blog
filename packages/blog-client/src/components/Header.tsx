import Link from "next/link";
export default function Header() {
  return (
    <nav>
      <div className="blog-branding">My blog</div>
      <div className="links">
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
