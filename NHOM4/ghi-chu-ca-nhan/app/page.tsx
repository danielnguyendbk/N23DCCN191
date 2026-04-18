'use client'

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import NoteForm from '../components/NoteForm'
import NoteList from '../components/NoteList'
import { ThemeProvider } from '../context/ThemeContext'

type Note = {
  id: number
  text: string
  createdAt: string
}

const sampleNotes = [
  {
    id: 1,
    text: '📗 Học useState để quản lý state trong component',
    createdAt: '17/04/2026, 20:00',
  },
  {
    id: 2,
    text: '⚡ Tìm hiểu useEffect xử lý side effects',
    createdAt: '17/04/2026, 20:05',
  },
  {
    id: 3,
    text: '🔗 Thực hành Context API chia sẻ dữ liệu',
    createdAt: '17/04/2026, 20:10',
  },
  {
    id: 4,
    text: '🌙 Thêm chức năng Dark / Light mode',
    createdAt: '17/04/2026, 20:15',
  },
  {
    id: 5,
    text: '💾 Lưu dữ liệu vào localStorage bằng useEffect',
    createdAt: '17/04/2026, 20:20',
  },
]

function getInitialNotes(): Note[] {
  if (typeof window === 'undefined') {
    return sampleNotes
  }

  const saved = localStorage.getItem('notes-data')
  if (!saved) {
    return sampleNotes
  }

  try {
    const parsed = JSON.parse(saved) as Note[]
    return Array.isArray(parsed) ? parsed : sampleNotes
  } catch {
    return sampleNotes
  }
}

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(getInitialNotes)

  useEffect(() => {
    localStorage.setItem('notes-data', JSON.stringify(notes))
  }, [notes])

  const addNote = (text: string) => {
    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toLocaleString('vi-VN'),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  return (
    <div className="page-shell">
      <Header count={notes.length} />

      <main className="main-area">
        <div className="board">
          <NoteForm onAdd={addNote} />
          <NoteList notes={notes} onDelete={deleteNote} />
        </div>
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  )
}