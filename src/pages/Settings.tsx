import React, { useRef } from 'react'
import { useApp } from '../state/AppState'

export default function Settings() {
  const { resetDemo, exportData, importData } = useApp()
  const fileRef = useRef<HTMLInputElement>(null)

  const onExport = async () => {
    const blob = await exportData()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ibbe-demo-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = async () => {
    if (confirm('This will reset all data to demo defaults. Continue?')) {
      await resetDemo()
      alert('Data reset to demo defaults!')
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) {
      await importData(f)
      alert('Data imported successfully!')
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      
      <section className="space-y-3">
        <h2 className="font-medium">Data Management</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleReset} 
            className="text-sm border rounded px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            🔄 Reset Demo Data
          </button>
          <button 
            onClick={onExport} 
            className="text-sm border rounded px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            📥 Export Data
          </button>
          <input 
            ref={fileRef} 
            type="file" 
            accept="application/json" 
            className="hidden" 
            onChange={handleImport}
          />
          <button 
            className="text-sm border rounded px-4 py-2 hover:bg-gray-50 transition-colors" 
            onClick={()=> fileRef.current?.click()}
          >
            📤 Import Data
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Export your data to save it, or import previously exported data.
        </p>
      </section>
    </div>
  )
}
