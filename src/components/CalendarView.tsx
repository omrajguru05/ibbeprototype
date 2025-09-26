import React, { useMemo } from 'react'
import type { Event } from '@types/models'

export default function CalendarView({ events }: { events: Event[] }) {
  const grouped = useMemo(() => {
    const byDay: Record<string, Event[]> = {}
    for (const e of events) {
      const day = new Date(e.when).toDateString()
      byDay[day] ??= []
      byDay[day].push(e)
    }
    return byDay
  }, [events])
  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([day, list]) => (
        <div key={day}>
          <div className="font-semibold">{day}</div>
          <ul className="text-sm list-disc pl-5">
            {list.map(ev => (<li key={ev.id}>{ev.title}</li>))}
          </ul>
        </div>
      ))}
    </div>
  )
}
