export type ID = string

export type AccountRole = 'organization' | 'founder' | 'individual'

export type Org = {
  id: ID
  name: string
  tag: string // e.g., @X School, @Y Firm
  members: ID[] // user ids
}

export type User = {
  id: ID
  name: string
  role: AccountRole
  orgId?: ID
  bio?: string
  skills?: string[]
}

export type Course = {
  id: ID
  orgId: ID // or founderId treated as orgId in seed
  title: string
  description: string
  paid: boolean
}

export type Enrollment = {
  id: ID
  courseId: ID
  userId: ID
  progress: number // 0..100
}

export type Post = {
  id: ID
  authorId: ID // org or user
  kind: 'announcement' | 'short'
  text: string
  createdAt: number
}

export type Video = {
  id: ID
  orgId: ID
  title: string
  url: string // YouTube embed link
}

export type Reel = {
  id: ID
  orgId: ID
  title: string
  url: string
}

export type Message = {
  id: ID
  threadId: ID
  authorId: ID
  text: string
  createdAt: number
}

export type Thread = {
  id: ID
  kind: 'dm' | 'group' | 'channel'
  name: string
  memberIds: ID[]
}

export type Asset = {
  id: ID
  orgId: ID
  name: string
  type: 'pdf' | 'book' | 'doc' | 'link'
  url: string
}

export type Event = {
  id: ID
  orgId: ID
  title: string
  when: string // ISO
}
