import React, { useEffect, useState } from 'react'
import { getAll } from '@storage/db'
import type { Post, Org } from '@types/models'
import FeedCard from '@components/FeedCard'

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [orgs, setOrgs] = useState<Org[]>([])
  useEffect(() => { (async () => {
    setPosts(await getAll<Post>('posts'))
    setOrgs(await getAll<Org>('orgs'))
  })() }, [])

  const orgName = (id: string) => orgs.find(o=>o.id===id)?.name || 'Unknown'

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold">Feed</h1>
      {posts.length > 0 ? (
        posts.map(p => (
          <FeedCard key={p.id} author={orgName(p.authorId)} text={p.text} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No posts yet. Check back later!</p>
        </div>
      )}
    </div>
  )
}
