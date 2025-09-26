import React from 'react'

export default function NotificationsPanel({ items }: { items: { id: string, text: string }[] }) {
  return (
    <ul className="space-y-2">
      {items.map(n => (
        <li key={n.id} className="border rounded p-3 bg-white text-sm">{n.text}</li>
      ))}
    </ul>
  )
}
