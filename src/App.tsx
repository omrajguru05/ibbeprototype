import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import Sidebar from './components/Sidebar'
import Banner from './components/Banner'
import AccountProvider from './state/AppState'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Profiles from './pages/Profiles'
import OrgPage from './pages/OrgPage'
import FounderPage from './pages/FounderPage'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Videos from './pages/Videos'
import Reels from './pages/Reels'
import Chat from './pages/Chat'
import Servers from './pages/Servers'
import Drive from './pages/Drive'
import Calendar from './pages/Calendar'
import Notes from './pages/Notes'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AccountProvider>
      <div className="app-shell">
        <div className="topnav border-b">
          <TopNav />
        </div>
        <div className="sidebar border-r">
          <Sidebar />
        </div>
        <main className="main">
          <Banner />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/feed" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/org/:id" element={<OrgPage />} />
              <Route path="/founder/:id" element={<FounderPage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/servers" element={<Servers />} />
              <Route path="/drive" element={<Drive />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </AccountProvider>
  )
}
