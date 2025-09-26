import React, { useEffect, useState } from 'react'
import { getAll } from '@storage/db'
import type { Video } from '@types/models'
import VideoPlayer from '@components/VideoPlayer'

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([])
  useEffect(()=> { (async()=> setVideos(await getAll<Video>('videos')))() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Video Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map(v => (<VideoPlayer key={v.id} title={v.title} url={v.url} />))}
      </div>
    </div>
  )
}
