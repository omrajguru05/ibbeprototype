import React from 'react'
import { useApp } from '@state/AppState'

export default function AccountSwitcher() {
  const { current, users, orgs, setCurrent } = useApp()
  const options = [
    ...orgs.map(o=>({ id: o.id, role: 'organization' as const, label: o.tag })),
    ...users.map(u=>({ id: u.id, role: u.role, label: u.role === 'founder' ? 'Independent' : u.name }))
  ]
  return (
    <select
      className="border rounded px-2 py-1 text-sm"
      value={current?.id || ''}
      onChange={e=>{
        const acc = options.find(o=>o.id===e.target.value)
        if (acc) setCurrent(acc)
      }}
    >
      <option value="" disabled>Select account</option>
      {options.map(o=> (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  )
}
