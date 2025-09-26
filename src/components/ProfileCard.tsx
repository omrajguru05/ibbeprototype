import React from 'react'

export default function ProfileCard({ name, tag, skills }: { name: string, tag?: string, skills?: string[] }) {
  return (
    <div className="border rounded p-3 bg-white">
      <div className="font-semibold">{name} <span className="text-xs text-neutral-500">{tag}</span></div>
      {skills?.length ? (
        <div className="text-xs text-neutral-600 mt-1">{skills.join(', ')}</div>
      ) : null}
    </div>
  )
}
