import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Ghi Chú Cá Nhân',
  description: 'Ứng dụng ghi chú cá nhân với Next.js',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}