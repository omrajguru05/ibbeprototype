import React from 'react'
import NotificationsPanel from '@components/NotificationsPanel'

export default function Notifications() {
  // demo notifications
  const items = [
    { id: 'n1', text: 'Alice enrolled in Intro to React' },
    { id: 'n2', text: 'New post from X School' },
  ]
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <NotificationsPanel items={items} />
    </div>
  )
}
