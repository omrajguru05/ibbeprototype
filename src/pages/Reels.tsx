import React, { useEffect, useState } from 'react'
import { getAll } from '../storage/db'
import type { Reel } from '../types/models'
import ReelsPlayer from '../components/ReelsPlayer'

export default function Reels() {
  const [reels, setReels] = useState<Reel[]>([])
  useEffect(()=> { (async()=> setReels(await getAll<Reel>('reels')))() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Reels</h1>
      <div className="flex flex-wrap gap-4">
        {reels.map(r => (<ReelsPlayer key={r.id} title={r.title} url={r.url} />))}
      </div>
    </div>
  )
}
