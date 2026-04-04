import Link from "next/link";

export default function HomePage() {
    return(
        <main className="container">
            <h1>Danh mục bài viết</h1>

            <ul>
                <li>
                    <Link href="#">Công nghệ</Link>
                </li>
                <li>
                    <Link href="#">Lập trình</Link>
                </li>
                <li>
                    <Link href="#">Cuộc sống</Link>
                </li>
            </ul>
        </main>
    )
}