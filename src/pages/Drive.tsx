import React, { useEffect, useState } from 'react'
import { getAll } from '@storage/db'
import type { Asset } from '@types/models'
import LibraryView from '@components/LibraryView'

export default function Drive() {
  const [assets, setAssets] = useState<Asset[]>([])
  useEffect(()=> { (async()=> setAssets(await getAll<Asset>('assets')))() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Drive</h1>
      <LibraryView assets={assets} />
    </div>
  )
}
