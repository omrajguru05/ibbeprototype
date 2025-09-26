import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAll } from '@storage/db'
import type { Course, Enrollment, User } from '@types/models'

export default function CourseDetail() {
  const { id } = useParams()
  const [course, setCourse] = useState<Course | undefined>()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [users, setUsers] = useState<User[]>([])
  useEffect(()=> { (async()=> {
    setCourse((await getAll<Course>('courses')).find(c=> c.id===id))
    setEnrollments((await getAll<Enrollment>('enrollments')).filter(e=> e.courseId===id))
    setUsers(await getAll<User>('users'))
  })() }, [id])
  if (!course) return <div>Course not found.</div>

  const learnerName = (uid: string) => users.find(u=>u.id===uid)?.name || 'Unknown'

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{course.title}</h1>
          <p className="text-sm text-neutral-600 mt-1">{course.description}</p>
        </div>
        <button 
          className="text-sm border rounded px-4 py-2 hover:bg-gray-50 transition-colors"
          onClick={() => alert('Mock action: ' + (course.paid ? 'Purchase' : 'Enrollment') + ' simulated!')}
        >
          {course.paid? 'Buy Course' : 'Enroll Free'}
        </button>
      </div>
      <section className="border-t pt-4">
        <h2 className="font-semibold mb-3">Enrolled Learners</h2>
        {enrollments.length > 0 ? (
          <div className="grid gap-2">
            {enrollments.map(e => (
              <div key={e.id} className="border rounded p-2 flex justify-between items-center">
                <span className="text-sm">{learnerName(e.userId)}</span>
                <div className="text-sm">
                  <div className="bg-gray-200 rounded-full h-2 w-24">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: `${e.progress}%`}}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{e.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No learners enrolled yet</p>
        )}
      </section>
    </div>
  )
}
