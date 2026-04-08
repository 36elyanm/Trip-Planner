import { useState } from 'react'
import './TripHeader.css'

export default function TripHeader({ tripName, onChangeName }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(tripName)

  const commit = () => {
    if (draft.trim()) onChangeName(draft.trim())
    setEditing(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') commit()
    if (e.key === 'Escape') { setDraft(tripName); setEditing(false) }
  }

  return (
    <header className="trip-header">
      <div className="trip-header-inner">
        <span className="trip-icon">✈️</span>
        {editing ? (
          <input
            className="trip-name-input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={handleKey}
            autoFocus
          />
        ) : (
          <h1 className="trip-name" onClick={() => { setDraft(tripName); setEditing(true) }} title="Click to rename">
            {tripName}
          </h1>
        )}
        <span className="trip-subtitle">Trip Planner</span>
      </div>
    </header>
  )
}
