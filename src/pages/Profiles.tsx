import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll } from '../storage/db'
import type { User, Org } from '../types/models'
import ProfileCard from '../components/ProfileCard'

export default function Profiles() {
  const [users, setUsers] = useState<User[]>([])
  const [orgs, setOrgs] = useState<Org[]>([])
  useEffect(()=> { (async()=>{
    setUsers(await getAll<User>('users'))
    setOrgs(await getAll<Org>('orgs'))
  })() }, [])
  const tagFor = (u: User) => u.role === 'founder' ? 'Independent' : orgs.find(o=>o.id===u.orgId)?.tag
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Profiles</h1>
      
      <section>
        <h2 className="font-medium mb-2">Organizations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {orgs.map(org => (
            <Link key={org.id} to={`/org/${org.id}`} className="block border rounded p-3 hover:shadow transition-shadow">
              <div className="font-semibold">{org.name}</div>
              <div className="text-xs text-gray-500">{org.tag}</div>
              <div className="text-xs mt-1">{org.members.length} members</div>
            </Link>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="font-medium mb-2">People</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {users.map(u => (
            <ProfileCard key={u.id} name={u.name} tag={tagFor(u)} skills={u.skills} />
          ))}
        </div>
      </section>
    </div>
  )
}
