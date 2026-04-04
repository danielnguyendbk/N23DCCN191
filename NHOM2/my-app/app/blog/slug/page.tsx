import Link from "next/link";

export default function HomePage() {
    return(
        <main className="container">
            <h1>Danh sách bài viết</h1>

            <ul>
                <li>
                    <Link href="#">Bài viết 1</Link>
                </li>
                <li>
                    <Link href="#">Bài viết 2</Link>
                </li>
            </ul>
        </main>
    )
}