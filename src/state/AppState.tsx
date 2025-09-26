import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedIfNeeded, getAll, clearAll, exportAll, importAll } from '../storage/db'
import type { AccountRole, Org, User } from '../types/models'

export type Account = {
  id: string
  role: AccountRole
  label: string
}

type AppContextType = {
  current?: Account
  setCurrent: (a: Account) => void
  orgs: Org[]
  users: User[]
  resetDemo: () => Promise<void>
  exportData: () => Promise<Blob>
  importData: (file: File) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AccountProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Account>()
  const [orgs, setOrgs] = useState<Org[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    ;(async () => {
      await seedIfNeeded()
      const [orgsDb, usersDb] = await Promise.all([
        getAll<Org>('orgs'),
        getAll<User>('users'),
      ])
      setOrgs(orgsDb)
      setUsers(usersDb)
      // default to first individual if none
      const saved = localStorage.getItem('ibbe.currentAccount')
      if (saved) setCurrent(JSON.parse(saved))
      else if (usersDb.length) setCurrent({ id: usersDb[0].id, role: 'individual', label: usersDb[0].name })
    })()
  }, [])

  useEffect(() => {
    if (current) localStorage.setItem('ibbe.currentAccount', JSON.stringify(current))
  }, [current])

  const resetDemo = async () => {
    await clearAll()
    await seedIfNeeded(true)
    const [orgsDb, usersDb] = await Promise.all([
      getAll<Org>('orgs'),
      getAll<User>('users'),
    ])
    setOrgs(orgsDb)
    setUsers(usersDb)
    setCurrent(usersDb.length ? { id: usersDb[0].id, role: 'individual', label: usersDb[0].name } : undefined)
  }

  const exportData = async () => exportAll()
  const importData = async (file: File) => {
    await importAll(file)
    const [orgsDb, usersDb] = await Promise.all([
      getAll<Org>('orgs'),
      getAll<User>('users'),
    ])
    setOrgs(orgsDb)
    setUsers(usersDb)
  }

  const value = useMemo<AppContextType>(() => ({ current, setCurrent, orgs, users, resetDemo, exportData, importData }), [current, orgs, users])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AccountProvider')
  return ctx
}
