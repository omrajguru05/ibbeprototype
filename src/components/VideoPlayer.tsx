import React from 'react'

export default function VideoPlayer({ title, url }: { title: string, url: string }) {
  return (
    <div className="space-y-2">
      <div className="aspect-video w-full bg-black rounded overflow-hidden">
        <iframe className="w-full h-full" src={url} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  )
}
