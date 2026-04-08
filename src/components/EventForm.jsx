import { useState } from 'react'
import './EventForm.css'

const TYPES = ['activity', 'transport', 'accommodation', 'food']

export default function EventForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    time: initial?.time || '09:00',
    type: initial?.type || 'activity',
    notes: initial?.notes || '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSubmit({ ...form, title: form.title.trim() })
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="event-form-row">
        <input
          className="event-form-input event-form-time"
          type="time"
          value={form.time}
          onChange={e => set('time', e.target.value)}
          required
        />
        <select
          className="event-form-select"
          value={form.type}
          onChange={e => set('type', e.target.value)}
        >
          {TYPES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
      <input
        className="event-form-input"
        type="text"
        placeholder="Activity title..."
        value={form.title}
        onChange={e => set('title', e.target.value)}
        required
        autoFocus={!initial}
      />
      <textarea
        className="event-form-textarea"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={e => set('notes', e.target.value)}
        rows={2}
      />
      <div className="event-form-actions">
        <button type="button" className="event-form-btn event-form-btn--cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="event-form-btn event-form-btn--save">
          {initial ? 'Save Changes' : 'Add Activity'}
        </button>
      </div>
    </form>
  )
}
