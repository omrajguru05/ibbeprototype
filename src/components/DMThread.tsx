import React from 'react'
import type { Message } from '@types/models'

export default function DMThread({ title, messages }: { title: string, messages: Message[] }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-semibold mb-2">{title}</div>
      <div className="space-y-1 max-h-80 overflow-auto">
        {messages.map(m => (
          <div key={m.id} className="text-sm">
            <span className="text-neutral-500 mr-2">{new Date(m.createdAt).toLocaleTimeString()}</span>
            {m.text}
          </div>
        ))}
      </div>
    </div>
  )
}
