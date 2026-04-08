import { useState } from 'react'
import EventForm from './EventForm'
import EventCard from './EventCard'
import './DayPanel.css'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function parseDate(dateKey) {
  if (!dateKey) return null
  const [y, m, d] = dateKey.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDate(dateKey) {
  const d = parseDate(dateKey)
  if (!d) return ''
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${days[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

let nextId = 100

export default function DayPanel({ selectedDate, events, onAddEvent, onDeleteEvent, onEditEvent }) {
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  const dayEvents = (selectedDate ? events[selectedDate] || [] : [])
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))

  const handleAdd = (data) => {
    onAddEvent(selectedDate, { ...data, id: ++nextId })
    setShowForm(false)
  }

  const handleEdit = (data) => {
    onEditEvent(selectedDate, { ...data, id: editingEvent.id })
    setEditingEvent(null)
  }

  if (!selectedDate) {
    return (
      <div className="day-panel day-panel--empty">
        <div className="day-panel-empty-state">
          <span className="day-panel-empty-icon">📅</span>
          <p>Select a day on the calendar to view or add activities</p>
        </div>
      </div>
    )
  }

  return (
    <div className="day-panel">
      <div className="day-panel-header">
        <h2 className="day-panel-date">{formatDate(selectedDate)}</h2>
        <span className="day-panel-count">
          {dayEvents.length} {dayEvents.length === 1 ? 'activity' : 'activities'}
        </span>
      </div>

      <div className="day-panel-events">
        {dayEvents.length === 0 && !showForm && (
          <div className="day-panel-no-events">No activities planned yet</div>
        )}
        {dayEvents.map(event => (
          editingEvent?.id === event.id ? (
            <EventForm
              key={event.id}
              initial={event}
              onSubmit={handleEdit}
              onCancel={() => setEditingEvent(null)}
            />
          ) : (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => setEditingEvent(event)}
              onDelete={() => onDeleteEvent(selectedDate, event.id)}
            />
          )
        ))}
        {showForm && !editingEvent && (
          <EventForm
            onSubmit={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {!showForm && !editingEvent && (
        <button className="day-panel-add-btn" onClick={() => setShowForm(true)}>
          + Add Activity
        </button>
      )}
    </div>
  )
}
