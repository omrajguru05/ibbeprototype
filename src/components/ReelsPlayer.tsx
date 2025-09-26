import React from 'react'

export default function ReelsPlayer({ title, url }: { title: string, url: string }) {
  return (
    <div className="w-full sm:max-w-xs">
      <div className="aspect-[9/16] bg-black rounded overflow-hidden">
        <iframe className="w-full h-full" src={url} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      <div className="text-sm mt-2 font-medium">{title}</div>
    </div>
  )
}
