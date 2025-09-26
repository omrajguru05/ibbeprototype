import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const links: [string, string][] = [
    ['/feed','Feed'],
    ['/profiles','Profiles'],
    ['/courses','Courses'],
    ['/videos','Videos'],
    ['/reels','Reels'],
    ['/chat','Chat'],
    ['/servers','Servers'],
    ['/drive','Drive'],
    ['/calendar','Calendar'],
    ['/notes','Notes'],
  ]
  return (
    <aside className="h-full p-3 bg-white">
      <ul className="space-y-1 text-sm">
        {links.map(([to,label])=> (
          <li key={to}>
            <NavLink to={to} className={({isActive})=> `block px-2 py-1 rounded ${isActive? 'bg-black text-white' : 'hover:bg-neutral-100'}`}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
