import React from 'react'

export default function FeedCard({ author, text }: { author: string, text: string }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="text-xs text-neutral-500 mb-1">{author}</div>
      <div className="text-sm">{text}</div>
    </div>
  )
}
