import React, { useEffect, useState } from 'react'
import { getAll } from '../storage/db'
import type { Course } from '../types/models'
import CourseCard from '../components/CourseCard'

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(()=> { (async()=> setCourses(await getAll<Course>('courses')))() }, [])
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {courses.map(c => (<CourseCard key={c.id} id={c.id} title={c.title} description={c.description} paid={c.paid} />))}
      </div>
    </div>
  )
}
