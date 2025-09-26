import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AccountSwitcher from './AccountSwitcher'

export default function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="h-14 flex items-center justify-between px-4 bg-white relative">
      <div className="flex items-center gap-3">
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="font-semibold">IBBE</Link>
      </div>
      
      <nav className="hidden md:flex gap-3 lg:gap-4 text-sm">
        {[
          ['/feed','Feed'],
          ['/courses','Courses'],
          ['/videos','Videos'],
          ['/reels','Reels'],
          ['/chat','Chat'],
          ['/drive','Drive'],
        ].map(([to,label]) => (
          <NavLink key={to} to={to} className={({isActive})=> isActive? 'font-semibold underline' : ''}>{label}</NavLink>
        ))}
      </nav>
      
      <div className="flex items-center gap-2 text-sm">
        <NavLink to="/notifications" className={({isActive})=> isActive? 'font-semibold' : ''}>🔔</NavLink>
        <NavLink to="/settings" className={({isActive})=> isActive? 'font-semibold' : ''}>⚙️</NavLink>
        <AccountSwitcher />
      </div>
      
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b shadow-lg md:hidden z-20">
          <nav className="flex flex-col p-4 gap-2">
            {[
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
            ].map(([to,label]) => (
              <NavLink 
                key={to} 
                to={to} 
                onClick={() => setMobileMenuOpen(false)}
                className={({isActive})=> `px-2 py-1 rounded ${isActive? 'bg-black text-white' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
