'use client'

import { useTheme } from '../context/ThemeContext'

export default function Header({ count }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-icon">📄</span>
        <span className="brand-text">Ghi Chú Cá Nhân</span>
      </div>

      <div className="topbar-right">
        <div className="count-badge">
          {count} ghi chú
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Đổi giao diện"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}