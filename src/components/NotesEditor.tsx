import React, { useState } from 'react'

export default function NotesEditor() {
  const [text, setText] = useState<string>(localStorage.getItem('ibbe.notes') || '')
  const [showPreview, setShowPreview] = useState(false)
  
  return (
    <div>
      <div className="md:hidden mb-3">
        <button 
          onClick={() => setShowPreview(!showPreview)}
          className="text-sm border rounded px-3 py-1"
        >
          {showPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea
          className={`border rounded p-3 h-80 resize-none ${showPreview ? 'hidden md:block' : ''}`}
          value={text}
          onChange={(e)=> setText(e.target.value)}
          onBlur={()=> localStorage.setItem('ibbe.notes', text)}
          placeholder="Write markdown notes..."
        />
        <div className={`border rounded p-3 bg-gray-50 h-80 overflow-auto whitespace-pre-wrap ${!showPreview ? 'hidden md:block' : ''}`}>
          {text || 'Preview will appear here...'}
        </div>
      </div>
    </div>
  )
}
