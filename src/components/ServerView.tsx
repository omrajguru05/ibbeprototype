import React from 'react'
import type { Thread } from '../types/models'

export default function ServerView({ threads, onOpen }: { threads: Thread[], onOpen: (id: string)=>void }) {
  const channels = threads.filter(t=> t.kind !== 'dm')
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-semibold mb-2">Channels</div>
      <ul className="text-sm space-y-1">
        {channels.map(c=> (
          <li key={c.id}>
            <button className="underline" onClick={()=> onOpen(c.id)}>{c.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
