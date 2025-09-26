import React from 'react'
import type { Asset } from '@types/models'

export default function LibraryView({ assets }: { assets: Asset[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {assets.map(a => (
        <a key={a.id} href={a.url} className="border rounded p-3 bg-white" target="_blank">
          <div className="text-xs text-neutral-500">{a.type.toUpperCase()}</div>
          <div className="text-sm">{a.name}</div>
        </a>
      ))}
    </div>
  )
}
