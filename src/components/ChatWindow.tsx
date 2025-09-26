import React from 'react'
import type { Message } from '@types/models'

export default function ChatWindow({ messages }: { messages: Message[] }) {
  return (
    <div className="border rounded p-3 bg-white h-80 overflow-auto space-y-2">
      {messages.map(m => (
        <div key={m.id} className="text-sm">
          <span className="text-neutral-500 mr-2">{new Date(m.createdAt).toLocaleTimeString()}</span>
          {m.text}
        </div>
      ))}
    </div>
  )
}
