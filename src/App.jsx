import { useState } from 'react'
import Calendar from './components/Calendar'
import DayPanel from './components/DayPanel'
import TripHeader from './components/TripHeader'
import './App.css'

const SAMPLE_EVENTS = {
  '2026-04-10': [
    { id: 1, time: '09:00', title: 'Flight to Paris', type: 'transport', notes: 'Terminal 2, Gate B12' },
    { id: 2, time: '18:00', title: 'Check-in Hotel Lumière', type: 'accommodation', notes: 'Confirmation: LUM-4821' },
  ],
  '2026-04-11': [
    { id: 3, time: '10:00', title: 'Eiffel Tower Visit', type: 'activity', notes: 'Pre-booked tickets' },
    { id: 4, time: '13:00', title: 'Lunch at Café de Flore', type: 'food', notes: '' },
    { id: 5, time: '15:30', title: 'Louvre Museum', type: 'activity', notes: 'Audio guide included' },
  ],
  '2026-04-12': [
    { id: 6, time: '11:00', title: 'Versailles Day Trip', type: 'activity', notes: 'Guided tour' },
    { id: 7, time: '19:30', title: 'Seine River Cruise', type: 'activity', notes: 'Dinner cruise' },
  ],
  '2026-04-13': [
    { id: 8, time: '08:00', title: 'Breakfast at Ladurée', type: 'food', notes: 'Famous macarons!' },
    { id: 9, time: '14:00', title: 'Flight Home', type: 'transport', notes: 'Check in 2hrs early' },
  ],
}

export default function App() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today)
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState(SAMPLE_EVENTS)
  const [tripName, setTripName] = useState('Paris Spring 2026')

  const handleSelectDate = (date) => {
    setSelectedDate(date)
  }

  const handleAddEvent = (dateKey, event) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), event],
    }))
  }

  const handleDeleteEvent = (dateKey, eventId) => {
    setEvents(prev => {
      const updated = (prev[dateKey] || []).filter(e => e.id !== eventId)
      if (updated.length === 0) {
        const { [dateKey]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [dateKey]: updated }
    })
  }

  const handleEditEvent = (dateKey, updatedEvent) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map(e =>
        e.id === updatedEvent.id ? updatedEvent : e
      ),
    }))
  }

  return (
    <div className="app">
      <TripHeader tripName={tripName} onChangeName={setTripName} />
      <div className="app-body">
        <div className="calendar-section">
          <Calendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            events={events}
          />
        </div>
        <div className="panel-section">
          <DayPanel
            selectedDate={selectedDate}
            events={events}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onEditEvent={handleEditEvent}
          />
        </div>
      </div>
    </div>
  )
}
