import React, { useEffect, useState } from 'react'
import { getAll } from '@storage/db'
import type { Event } from '@types/models'
import CalendarView from '@components/CalendarView'

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([])
  useEffect(()=> { (async()=> setEvents(await getAll<Event>('events')))() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Calendar</h1>
      <CalendarView events={events} />
    </div>
  )
}
