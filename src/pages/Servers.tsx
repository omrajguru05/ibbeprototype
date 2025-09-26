import React, { useEffect, useMemo, useState } from 'react'
import { getAll } from '@storage/db'
import type { Message, Thread } from '@types/models'
import ServerView from '@components/ServerView'
import ChatWindow from '@components/ChatWindow'

export default function Servers() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [open, setOpen] = useState<string | undefined>()
  useEffect(()=> { (async()=>{
    setThreads(await getAll<Thread>('threads'))
    setMessages(await getAll<Message>('messages'))
  })() }, [])
  const chanMsgs = useMemo(()=> messages.filter(m=> m.threadId===open), [messages, open])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Servers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ServerView threads={threads} onOpen={setOpen} />
        <div className="md:col-span-2">
          {open ? <ChatWindow messages={chanMsgs} /> : <div className="text-sm text-neutral-600">Open a channel</div>}
        </div>
      </div>
    </div>
  )
}
