import React from 'react'
import NotesEditor from '@components/NotesEditor'

export default function Notes() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Notes</h1>
      <NotesEditor />
    </div>
  )
}
