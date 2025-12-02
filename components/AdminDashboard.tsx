/**
 * Admin dashboard component
 * Displays RSVP list and export functionality
 */

'use client'

import { useEffect, useState } from 'react'
import { deleteRSVP, getAllRSVPs, updateRSVP } from '@/app/actions/rsvps'
import type { RSVP } from '@/lib/types'

interface EditState {
  id: string | null
  name: string
  email: string
  attending: boolean
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState>({
    id: null,
    name: '',
    email: '',
    attending: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadRSVPs()
  }, [])

  const loadRSVPs = async () => {
    setIsLoading(true)
    setError(null)
    setActionMessage(null)
    try {
      const data = await getAllRSVPs()
      setRsvps(data)
    } catch (err) {
      setError('Failed to load RSVPs')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const startEdit = (rsvp: RSVP) => {
    setEditState({
      id: rsvp.id,
      name: rsvp.name,
      email: rsvp.email,
      attending: rsvp.attending,
    })
    setActionMessage(null)
  }

  const cancelEdit = () => {
    setEditState({
      id: null,
      name: '',
      email: '',
      attending: true,
    })
  }

  const saveEdit = async () => {
    if (!editState.id) return

    setIsSaving(true)
    setActionMessage(null)
    const result = await updateRSVP(editState.id, {
      name: editState.name,
      email: editState.email,
      attending: editState.attending,
    })
    setIsSaving(false)

    if (!result.success) {
      setActionMessage(result.error || 'Failed to update RSVP.')
      return
    }

    await loadRSVPs()
    cancelEdit()
    setActionMessage('RSVP updated successfully.')
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this RSVP? This action cannot be undone.'
    )
    if (!confirmed) return

    setIsDeleting(id)
    setActionMessage(null)
    const result = await deleteRSVP(id)
    setIsDeleting(null)

    if (!result.success) {
      setActionMessage(result.error || 'Failed to delete RSVP.')
      return
    }

    await loadRSVPs()
    setActionMessage('RSVP deleted successfully.')
  }

  const handleExport = () => {
    // Convert RSVPs to CSV format
    const headers = ['Name', 'Email', 'Attending', 'Submitted At']
    const rows = rsvps.map((rsvp) => [
      rsvp.name,
      rsvp.email,
      rsvp.attending ? 'Yes' : 'No',
      new Date(rsvp.created_at).toLocaleString(),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rsvps-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const attendingCount = rsvps.filter((r) => r.attending).length
  const notAttendingCount = rsvps.filter((r) => !r.attending).length

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif text-wedding-maroon-dark">Admin Dashboard</h1>
            <form action={onLogout}>
              <button
                type="submit"
                className="text-wedding-maroon hover:text-wedding-maroon-dark transition-colors"
              >
                Logout
              </button>
            </form>
          </div>

          <div className="mb-6 flex gap-4 flex-wrap">
            <div className="bg-wedding-beige-light p-4 rounded-lg flex-1 min-w-[200px]">
              <div className="text-sm text-wedding-maroon">Total RSVPs</div>
              <div className="text-2xl font-bold text-wedding-maroon-dark">{rsvps.length}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex-1 min-w-[200px]">
              <div className="text-sm text-green-700">Attending</div>
              <div className="text-2xl font-bold text-green-800">{attendingCount}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg flex-1 min-w-[200px]">
              <div className="text-sm text-red-700">Not Attending</div>
              <div className="text-2xl font-bold text-red-800">{notAttendingCount}</div>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-wedding-maroon-dark">RSVP Responses</h2>
            <button
              onClick={handleExport}
              disabled={rsvps.length === 0}
              className="bg-wedding-maroon text-white px-4 py-2 rounded-lg font-semibold hover:bg-wedding-maroon-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
          </div>

          {actionMessage && (
            <div className="mb-4 p-3 bg-wedding-beige-light text-wedding-maroon-dark border border-wedding-beige-dark rounded-lg">
              {actionMessage}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8 text-wedding-maroon">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-8 text-wedding-maroon">No RSVPs yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-wedding-beige">
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Name
                    </th>
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Email
                    </th>
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Attending
                    </th>
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Submitted
                    </th>
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Updated
                    </th>
                    <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-wedding-beige-light">
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {editState.id === rsvp.id ? (
                          <input
                            type="text"
                            value={editState.name}
                            onChange={(e) =>
                              setEditState((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full px-2 py-1 border border-wedding-beige-dark rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                          />
                        ) : (
                          rsvp.name
                        )}
                      </td>
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {editState.id === rsvp.id ? (
                          <input
                            type="email"
                            value={editState.email}
                            onChange={(e) =>
                              setEditState((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="w-full px-2 py-1 border border-wedding-beige-dark rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                          />
                        ) : (
                          rsvp.email
                        )}
                      </td>
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {editState.id === rsvp.id ? (
                          <select
                            value={editState.attending ? 'yes' : 'no'}
                            onChange={(e) =>
                              setEditState((prev) => ({
                                ...prev,
                                attending: e.target.value === 'yes',
                              }))
                            }
                            className="px-2 py-1 border border-wedding-beige-dark rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent bg-white"
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        ) : rsvp.attending ? (
                          <span className="text-green-700 font-semibold">Yes</span>
                        ) : (
                          <span className="text-red-700 font-semibold">No</span>
                        )}
                      </td>
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {new Date(rsvp.created_at).toLocaleString()}
                      </td>
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {rsvp.updated_at
                          ? new Date(rsvp.updated_at).toLocaleString()
                          : '—'}
                      </td>
                      <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                        {editState.id === rsvp.id ? (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={saveEdit}
                              disabled={isSaving}
                              className="px-3 py-1 text-sm rounded-md bg-wedding-maroon text-white hover:bg-wedding-maroon-dark disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSaving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              className="px-3 py-1 text-sm rounded-md border border-wedding-beige-dark text-wedding-maroon hover:bg-wedding-beige-light"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(rsvp)}
                              className="px-3 py-1 text-sm rounded-md border border-wedding-beige-dark text-wedding-maroon hover:bg-wedding-beige-light"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(rsvp.id)}
                              disabled={isDeleting === rsvp.id}
                              className="px-3 py-1 text-sm rounded-md border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isDeleting === rsvp.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

