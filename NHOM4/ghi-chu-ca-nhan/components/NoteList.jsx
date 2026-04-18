'use client'

export default function NoteList({ notes, onDelete }) {
  return (
    <div className="notes-wrapper">
      {notes.length === 0 ? (
        <div className="empty-state">Chưa có ghi chú nào.</div>
      ) : (
        notes.map((note) => (
          <div className="note-card" key={note.id}>
            <div className="note-content">
              <div className="note-title">{note.text}</div>
              <div className="note-time">{note.createdAt}</div>
            </div>

            <button
              type="button"
              className="delete-btn"
              onClick={() => onDelete(note.id)}
            >
              Xóa
            </button>
          </div>
        ))
      )}
    </div>
  )
}