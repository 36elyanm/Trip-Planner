import './EventCard.css'

const TYPE_META = {
  transport:     { icon: '✈️', label: 'Transport',     color: '#f6ad55', bg: '#fffaf0' },
  accommodation: { icon: '🏨', label: 'Accommodation', color: '#68d391', bg: '#f0fff4' },
  activity:      { icon: '🗺️', label: 'Activity',      color: '#63b3ed', bg: '#ebf8ff' },
  food:          { icon: '🍽️', label: 'Food',          color: '#fc8181', bg: '#fff5f5' },
}

export default function EventCard({ event, onEdit, onDelete }) {
  const meta = TYPE_META[event.type] || { icon: '📌', label: event.type, color: '#a0aec0', bg: '#f7fafc' }

  return (
    <div className="event-card" style={{ borderLeftColor: meta.color, background: meta.bg }}>
      <div className="event-card-row">
        <span className="event-time">{event.time}</span>
        <span className="event-icon">{meta.icon}</span>
        <span className="event-title">{event.title}</span>
        <div className="event-actions">
          <button className="event-btn" onClick={onEdit} title="Edit">✏️</button>
          <button className="event-btn event-btn--delete" onClick={onDelete} title="Delete">🗑️</button>
        </div>
      </div>
      {event.notes && <p className="event-notes">{event.notes}</p>}
    </div>
  )
}
