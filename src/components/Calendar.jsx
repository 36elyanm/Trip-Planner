import './Calendar.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function toDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function getEventDot(events, dateKey) {
  const dayEvents = events[dateKey] || []
  if (dayEvents.length === 0) return null
  const types = [...new Set(dayEvents.map(e => e.type))]
  return types
}

const TYPE_COLORS = {
  transport: '#f6ad55',
  accommodation: '#68d391',
  activity: '#63b3ed',
  food: '#fc8181',
}

export default function Calendar({ currentMonth, onMonthChange, selectedDate, onSelectDate, events }) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const today = new Date()
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate())

  const prevMonth = () => onMonthChange(new Date(year, month - 1, 1))
  const nextMonth = () => onMonthChange(new Date(year, month + 1, 1))

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="calendar">
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={prevMonth} aria-label="Previous month">&#8249;</button>
        <span className="cal-month-label">{MONTHS[month]} {year}</span>
        <button className="cal-nav-btn" onClick={nextMonth} aria-label="Next month">&#8250;</button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="cal-cell cal-cell--empty" />
          const dateKey = toDateKey(year, month, day)
          const isToday = dateKey === todayKey
          const isSelected = selectedDate === dateKey
          const dots = getEventDot(events, dateKey)
          return (
            <button
              key={dateKey}
              className={[
                'cal-cell',
                isToday ? 'cal-cell--today' : '',
                isSelected ? 'cal-cell--selected' : '',
                dots ? 'cal-cell--has-events' : '',
              ].join(' ')}
              onClick={() => onSelectDate(dateKey)}
            >
              <span className="cal-day-num">{day}</span>
              {dots && (
                <div className="cal-dots">
                  {dots.slice(0, 3).map(type => (
                    <span
                      key={type}
                      className="cal-dot"
                      style={{ background: TYPE_COLORS[type] || '#a0aec0' }}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>
      <div className="cal-legend">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <span key={type} className="cal-legend-item">
            <span className="cal-dot" style={{ background: color }} />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>
    </div>
  )
}
