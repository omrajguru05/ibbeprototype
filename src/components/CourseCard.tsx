import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard({ id, title, description, paid }: { id: string, title: string, description: string, paid: boolean }) {
  return (
    <Link to={`/courses/${id}`} className="block border rounded p-3 bg-white hover:shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-xs px-2 py-0.5 rounded border">{paid ? 'Paid' : 'Free'}</span>
      </div>
      <p className="text-sm text-neutral-600 mt-1">{description}</p>
    </Link>
  )
}
