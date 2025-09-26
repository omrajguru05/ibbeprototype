// Very small IndexedDB helper tailored for the prototype
// Stores: orgs, users, courses, enrollments, posts, videos, reels, messages, threads, assets, events

import type { Org, User, Course, Enrollment, Post, Video, Reel, Message, Thread, Asset, Event } from '@types/models'

const DB_NAME = 'ibbe-prototype'
const DB_VERSION = 1
const STORES = ['orgs','users','courses','enrollments','posts','videos','reels','messages','threads','assets','events'] as const
export type StoreName = typeof STORES[number]

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      for (const s of STORES) {
        if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function tx<T>(db: IDBDatabase, store: StoreName, mode: IDBTransactionMode, op: (store: IDBObjectStore)=>void): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode)
    const s = t.objectStore(store)
    op(s)
    t.oncomplete = () => resolve(undefined as unknown as T)
    t.onerror = () => reject(t.error)
  })
}

export async function putAll<T extends {id: string}>(store: StoreName, items: T[]): Promise<void> {
  const db = await openDb()
  await tx<void>(db, store, 'readwrite', s => {
    for (const item of items) s.put(item)
  })
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, 'readonly')
    const s = t.objectStore(store)
    const req = s.getAll()
    req.onsuccess = () => resolve(req.result as T[])
    req.onerror = () => reject(req.error)
  })
}

export async function clearAll(): Promise<void> {
  const db = await openDb()
  await Promise.all(STORES.map(store => tx<void>(db, store, 'readwrite', s => { s.clear() })))
  localStorage.removeItem('ibbe.currentAccount')
  localStorage.removeItem('ibbe.seeded')
}

export async function exportAll(): Promise<Blob> {
  const [orgs, users, courses, enrollments, posts, videos, reels, messages, threads, assets, events] = await Promise.all([
    getAll<Org>('orgs'),
    getAll<User>('users'),
    getAll<Course>('courses'),
    getAll<Enrollment>('enrollments'),
    getAll<Post>('posts'),
    getAll<Video>('videos'),
    getAll<Reel>('reels'),
    getAll<Message>('messages'),
    getAll<Thread>('threads'),
    getAll<Asset>('assets'),
    getAll<Event>('events'),
  ])
  const data = { orgs, users, courses, enrollments, posts, videos, reels, messages, threads, assets, events }
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
}

export async function importAll(file: File): Promise<void> {
  const text = await file.text()
  const json = JSON.parse(text)
  await Promise.all([
    putAll('orgs', json.orgs ?? []),
    putAll('users', json.users ?? []),
    putAll('courses', json.courses ?? []),
    putAll('enrollments', json.enrollments ?? []),
    putAll('posts', json.posts ?? []),
    putAll('videos', json.videos ?? []),
    putAll('reels', json.reels ?? []),
    putAll('messages', json.messages ?? []),
    putAll('threads', json.threads ?? []),
    putAll('assets', json.assets ?? []),
    putAll('events', json.events ?? []),
  ])
}

function id(prefix: string) { return `${prefix}_${Math.random().toString(36).slice(2,10)}` }

export async function seedIfNeeded(force = false): Promise<void> {
  const already = localStorage.getItem('ibbe.seeded')
  if (already && !force) return
  
  // Create organizations
  const orgX: Org = { id: id('org'), name: 'TechLearn Academy', tag: '@TechLearn', members: [] }
  const orgY: Org = { id: id('org'), name: 'DataSci Institute', tag: '@DataSci', members: [] }
  const orgZ: Org = { id: id('org'), name: 'Creative Studio', tag: '@CreativeStudio', members: [] }
  
  // Create users
  const founder: User = { id: id('user'), name: 'Sarah Coach', role: 'founder', skills: ['Leadership', 'Mentoring', 'Strategy'] }
  const alice: User = { id: id('user'), name: 'Alice Chen', role: 'individual', orgId: orgX.id, skills: ['JavaScript','React','TypeScript'] }
  const bob: User = { id: id('user'), name: 'Bob Martinez', role: 'individual', orgId: orgY.id, skills: ['Python','Data Science','ML'] }
  const charlie: User = { id: id('user'), name: 'Charlie Kim', role: 'individual', orgId: orgX.id, skills: ['Node.js','MongoDB'] }
  const dana: User = { id: id('user'), name: 'Dana Patel', role: 'individual', orgId: orgZ.id, skills: ['Design','Figma','UX'] }
  
  orgX.members = [alice.id, charlie.id]
  orgY.members = [bob.id]
  orgZ.members = [dana.id]
  
  // Create courses
  const course1: Course = { id: id('course'), orgId: orgX.id, title: 'React Fundamentals', description: 'Master React from basics to advanced patterns', paid: false }
  const course2: Course = { id: id('course'), orgId: orgX.id, title: 'Advanced TypeScript', description: 'Deep dive into TypeScript features', paid: true }
  const course3: Course = { id: id('course'), orgId: orgY.id, title: 'Python for Data Science', description: 'Complete Python course for data analysis', paid: false }
  const course4: Course = { id: id('course'), orgId: founder.id, title: 'Leadership Coaching', description: '1-on-1 coaching program', paid: true }
  const course5: Course = { id: id('course'), orgId: orgZ.id, title: 'UI/UX Design Basics', description: 'Learn design principles', paid: false }
  
  // Create enrollments
  const enroll1: Enrollment = { id: id('enr'), courseId: course1.id, userId: alice.id, progress: 75 }
  const enroll2: Enrollment = { id: id('enr'), courseId: course1.id, userId: charlie.id, progress: 30 }
  const enroll3: Enrollment = { id: id('enr'), courseId: course3.id, userId: bob.id, progress: 100 }
  const enroll4: Enrollment = { id: id('enr'), courseId: course4.id, userId: alice.id, progress: 50 }
  
  // Create posts
  const now = Date.now()
  const post1: Post = { id: id('post'), authorId: orgX.id, kind: 'announcement', text: 'Welcome to TechLearn Academy! New React course starting next week.', createdAt: now - 86400000 }
  const post2: Post = { id: id('post'), authorId: orgY.id, kind: 'announcement', text: 'Data Science bootcamp applications now open!', createdAt: now - 43200000 }
  const post3: Post = { id: id('post'), authorId: orgZ.id, kind: 'short', text: 'Check out our latest design workshop recordings', createdAt: now - 7200000 }
  const post4: Post = { id: id('post'), authorId: founder.id, kind: 'short', text: 'Slots available for 1-on-1 coaching sessions', createdAt: now - 3600000 }
  
  // Create videos
  const video1: Video = { id: id('video'), orgId: orgX.id, title: 'React Hooks Explained', url: 'https://www.youtube.com/embed/dpw9EHDh2bM' }
  const video2: Video = { id: id('video'), orgId: orgX.id, title: 'State Management Patterns', url: 'https://www.youtube.com/embed/zpUMRsAO6-Y' }
  const video3: Video = { id: id('video'), orgId: orgY.id, title: 'Intro to NumPy', url: 'https://www.youtube.com/embed/QUT1VHiLmmI' }
  
  // Create reels
  const reel1: Reel = { id: id('reel'), orgId: orgX.id, title: 'React Tip #1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  const reel2: Reel = { id: id('reel'), orgId: orgZ.id, title: 'Design in 60 seconds', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  
  // Create threads and messages
  const threadDm1: Thread = { id: id('thread'), kind: 'dm', name: 'Alice <> Sarah', memberIds: [alice.id, founder.id] }
  const threadDm2: Thread = { id: id('thread'), kind: 'dm', name: 'Bob <> Charlie', memberIds: [bob.id, charlie.id] }
  const threadChannel: Thread = { id: id('thread'), kind: 'channel', name: '#general', memberIds: [alice.id, bob.id, charlie.id] }
  
  const msg1: Message = { id: id('msg'), threadId: threadDm1.id, authorId: alice.id, text: 'Hi Sarah, I\'d like to discuss the coaching program', createdAt: now - 3600000 }
  const msg2: Message = { id: id('msg'), threadId: threadDm1.id, authorId: founder.id, text: 'Sure! Let\'s schedule a call. What time works for you?', createdAt: now - 3000000 }
  const msg3: Message = { id: id('msg'), threadId: threadChannel.id, authorId: charlie.id, text: 'Anyone interested in a study group?', createdAt: now - 1800000 }
  const msg4: Message = { id: id('msg'), threadId: threadChannel.id, authorId: alice.id, text: 'Count me in!', createdAt: now - 1200000 }
  
  // Create assets
  const asset1: Asset = { id: id('asset'), orgId: orgX.id, name: 'React Course Syllabus.pdf', type: 'pdf', url: '#' }
  const asset2: Asset = { id: id('asset'), orgId: orgX.id, name: 'TypeScript Handbook', type: 'book', url: '#' }
  const asset3: Asset = { id: id('asset'), orgId: orgY.id, name: 'Python Cheat Sheet', type: 'doc', url: '#' }
  const asset4: Asset = { id: id('asset'), orgId: orgZ.id, name: 'Design Resources', type: 'link', url: 'https://example.com' }
  
  // Create events
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  
  const event1: Event = { id: id('event'), orgId: orgX.id, title: 'React Workshop - Building Custom Hooks', when: tomorrow.toISOString() }
  const event2: Event = { id: id('event'), orgId: orgX.id, title: 'Q&A Session with Instructors', when: nextWeek.toISOString() }
  const event3: Event = { id: id('event'), orgId: orgY.id, title: 'Data Science Meetup', when: tomorrow.toISOString() }
  const event4: Event = { id: id('event'), orgId: orgZ.id, title: 'Design Critique Session', when: new Date().toISOString() }

  await Promise.all([
    putAll('orgs', [orgX, orgY, orgZ]),
    putAll('users', [founder, alice, bob, charlie, dana]),
    putAll('courses', [course1, course2, course3, course4, course5]),
    putAll('enrollments', [enroll1, enroll2, enroll3, enroll4]),
    putAll('posts', [post1, post2, post3, post4]),
    putAll('videos', [video1, video2, video3]),
    putAll('reels', [reel1, reel2]),
    putAll('threads', [threadDm1, threadDm2, threadChannel]),
    putAll('messages', [msg1, msg2, msg3, msg4]),
    putAll('assets', [asset1, asset2, asset3, asset4]),
    putAll('events', [event1, event2, event3, event4]),
  ])
  localStorage.setItem('ibbe.seeded', '1')
}
