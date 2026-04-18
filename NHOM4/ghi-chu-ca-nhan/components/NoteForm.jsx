'use client'

import { useState } from 'react'

export default function NoteForm({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmed = value.trim()
    if (!trimmed) return

    onAdd(trimmed)
    setValue('')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nhập ghi chú mới..."
        className="note-input"
      />
      <button type="submit" className="add-btn">
        + Thêm
      </button>
    </form>
  )
}