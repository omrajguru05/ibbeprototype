import React, { useEffect, useMemo, useState } from 'react'
import { getAll } from '@storage/db'
import type { Message, Thread } from '@types/models'
import DMThread from '@components/DMThread'

export default function Chat() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [open, setOpen] = useState<string | undefined>()
  useEffect(()=> { (async()=>{
    setThreads(await getAll<Thread>('threads'))
    setMessages(await getAll<Message>('messages'))
  })() }, [])
  const dms = threads.filter(t=> t.kind === 'dm')
  const currentMsgs = useMemo(()=> messages.filter(m=> m.threadId===open), [messages, open])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Direct Messages</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64">
          <div className="border rounded p-2 bg-gray-50">
            <div className="font-medium text-sm mb-2">Conversations</div>
            <ul className="space-y-1 text-sm">
              {dms.map(t => (
                <li key={t.id}>
                  <button onClick={()=> setOpen(t.id)} className={`block w-full text-left px-2 py-1 rounded ${open===t.id? 'bg-black text-white' : 'hover:bg-gray-100'}`}>{t.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <section className="flex-1">
          {open ? <DMThread title={dms.find(d=>d.id===open)?.name || ''} messages={currentMsgs} /> : <div className="text-sm text-neutral-600 p-4 border rounded">Select a conversation to start chatting</div>}
        </section>
      </div>
    </div>
  )
}
