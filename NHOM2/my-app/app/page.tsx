import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Trang chủ Blog</h1>
      <ul>
        <li>
          <Link href="/blog">Danh sách bài viết</Link>
        </li>
        <li>
          <Link href="/categories">Danh mục bài viết </Link>
        </li>
      </ul>
    </main>
  );
}
