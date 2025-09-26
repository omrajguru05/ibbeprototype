import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAll } from '@storage/db'
import type { Org, Course, Asset, Event } from '@types/models'
import CourseCard from '@components/CourseCard'
import LibraryView from '@components/LibraryView'
import CalendarView from '@components/CalendarView'

export default function OrgPage() {
  const { id } = useParams()
  const [org, setOrg] = useState<Org | undefined>()
  const [courses, setCourses] = useState<Course[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [events, setEvents] = useState<Event[]>([])
  useEffect(()=> { (async()=>{
    const orgs = await getAll<Org>('orgs')
    setOrg(orgs.find(o=>o.id===id))
    setCourses((await getAll<Course>('courses')).filter(c=> c.orgId===id))
    setAssets((await getAll<Asset>('assets')).filter(a=> a.orgId===id))
    setEvents((await getAll<Event>('events')).filter(ev=> ev.orgId===id))
  })() }, [id])
  if (!org) return <div className="text-gray-500">Organization not found.</div>
  
  return (
    <div className="space-y-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">{org.name}</h1>
        <p className="text-sm text-gray-500">{org.tag} · {org.members.length} members</p>
      </header>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Courses</h2>
          <span className="text-xs text-gray-500">{courses.length} available</span>
        </div>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {courses.map(c => (<CourseCard key={c.id} id={c.id} title={c.title} description={c.description} paid={c.paid} />))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No courses available yet</p>
        )}
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Library Resources</h2>
          <span className="text-xs text-gray-500">{assets.length} items</span>
        </div>
        {assets.length > 0 ? (
          <LibraryView assets={assets} />
        ) : (
          <p className="text-sm text-gray-500">No resources available yet</p>
        )}
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Upcoming Events</h2>
          <span className="text-xs text-gray-500">{events.length} scheduled</span>
        </div>
        {events.length > 0 ? (
          <CalendarView events={events} />
        ) : (
          <p className="text-sm text-gray-500">No events scheduled</p>
        )}
      </section>
    </div>
  )
}
