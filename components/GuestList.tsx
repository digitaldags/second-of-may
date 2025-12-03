/**
 * Guest List component for managing pre-approved guests
 * Displays guest list with CRUD functionality
 */

'use client'

import { useEffect, useState, FormEvent } from 'react'
import {
  createGuest,
  deleteGuest,
  getAllGuests,
  updateGuest,
} from '@/app/actions/guests'
import type { Guest } from '@/lib/types'

interface EditState {
  id: string | null
  first_name: string
  last_name: string
}

export default function GuestList() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState>({
    id: null,
    first_name: '',
    last_name: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newGuest, setNewGuest] = useState({ first_name: '', last_name: '' })

  useEffect(() => {
    loadGuests()
  }, [])

  const loadGuests = async () => {
    setIsLoading(true)
    setError(null)
    setActionMessage(null)
    try {
      const data = await getAllGuests()
      setGuests(data)
    } catch (err) {
      setError('Failed to load guests')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const startEdit = (guest: Guest) => {
    setEditState({
      id: guest.id,
      first_name: guest.first_name,
      last_name: guest.last_name,
    })
    setActionMessage(null)
  }

  const cancelEdit = () => {
    setEditState({
      id: null,
      first_name: '',
      last_name: '',
    })
  }

  const saveEdit = async () => {
    if (!editState.id) return

    setIsSaving(true)
    setActionMessage(null)
    const result = await updateGuest(editState.id, {
      first_name: editState.first_name,
      last_name: editState.last_name,
    })
    setIsSaving(false)

    if (!result.success) {
      setActionMessage(result.error || 'Failed to update guest.')
      return
    }

    await loadGuests()
    cancelEdit()
    setActionMessage('Guest updated successfully.')
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this guest? This action cannot be undone.'
    )
    if (!confirmed) return

    setIsDeleting(id)
    setActionMessage(null)
    const result = await deleteGuest(id)
    setIsDeleting(null)

    if (!result.success) {
      setActionMessage(result.error || 'Failed to delete guest.')
      return
    }

    await loadGuests()
    setActionMessage('Guest deleted successfully.')
  }

  const handleOpenAddModal = () => {
    setNewGuest({ first_name: '', last_name: '' })
    setAddError(null)
    setIsAddModalOpen(true)
  }

  const handleAddGuest = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsCreating(true)
    setAddError(null)

    const result = await createGuest(newGuest.first_name, newGuest.last_name)
    setIsCreating(false)

    if (!result.success) {
      setAddError(result.error || 'Failed to add guest.')
      return
    }

    setIsAddModalOpen(false)
    setActionMessage('Guest added successfully.')
    await loadGuests()
  }

  const handleExport = () => {
    // Convert guests to CSV format
    const headers = ['First Name', 'Last Name', 'Created At', 'Updated At']
    const rows = guests.map((guest) => [
      guest.first_name,
      guest.last_name,
      new Date(guest.created_at).toLocaleString(),
      guest.updated_at ? new Date(guest.updated_at).toLocaleString() : '—',
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
    a.download = `guest-list-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-4 flex flex-wrap gap-3 justify-between items-center">
        <h2 className="text-xl font-semibold text-wedding-maroon-dark">Guest List</h2>
        <div className="flex gap-2">
          <button
            onClick={handleOpenAddModal}
            className="bg-wedding-maroon text-white px-4 py-2 rounded-lg font-semibold hover:bg-wedding-maroon-dark transition-colors duration-200"
          >
            Add Guest
          </button>
          <button
            onClick={handleExport}
            disabled={guests.length === 0}
            className="bg-wedding-maroon/80 text-white px-4 py-2 rounded-lg font-semibold hover:bg-wedding-maroon transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export CSV
          </button>
        </div>
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
      ) : guests.length === 0 ? (
        <div className="text-center py-8 text-wedding-maroon">No guests yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-wedding-beige">
                <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                  First Name
                </th>
                <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                  Last Name
                </th>
                <th className="border border-wedding-beige-dark px-4 py-2 text-left text-wedding-maroon-dark">
                  Created
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
              {guests.map((guest) => (
                <tr key={guest.id} className="hover:bg-wedding-beige-light">
                  <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                    {editState.id === guest.id ? (
                      <input
                        type="text"
                        value={editState.first_name}
                        onChange={(e) =>
                          setEditState((prev) => ({
                            ...prev,
                            first_name: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-wedding-beige-dark rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                      />
                    ) : (
                      guest.first_name
                    )}
                  </td>
                  <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                    {editState.id === guest.id ? (
                      <input
                        type="text"
                        value={editState.last_name}
                        onChange={(e) =>
                          setEditState((prev) => ({
                            ...prev,
                            last_name: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-wedding-beige-dark rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                      />
                    ) : (
                      guest.last_name
                    )}
                  </td>
                  <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                    {new Date(guest.created_at).toLocaleString()}
                  </td>
                  <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                    {guest.updated_at
                      ? new Date(guest.updated_at).toLocaleString()
                      : '—'}
                  </td>
                  <td className="border border-wedding-beige-dark px-4 py-2 text-wedding-maroon">
                    {editState.id === guest.id ? (
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
                          onClick={() => startEdit(guest)}
                          className="px-3 py-1 text-sm rounded-md border border-wedding-beige-dark text-wedding-maroon hover:bg-wedding-beige-light"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(guest.id)}
                          disabled={isDeleting === guest.id}
                          className="px-3 py-1 text-sm rounded-md border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeleting === guest.id ? 'Deleting...' : 'Delete'}
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
      {/* Add guest modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-2xl font-serif text-wedding-maroon-dark">
                Add Guest
              </h3>
              <p className="text-sm text-wedding-maroon">
                Add a pre-approved guest to the list.
              </p>
            </div>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label
                  htmlFor="new_first_name"
                  className="block text-sm font-medium text-wedding-maroon-dark mb-2"
                >
                  First Name *
                </label>
                <input
                  id="new_first_name"
                  type="text"
                  required
                  value={newGuest.first_name}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, first_name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-wedding-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                  placeholder="First name"
                />
              </div>
              <div>
                <label
                  htmlFor="new_last_name"
                  className="block text-sm font-medium text-wedding-maroon-dark mb-2"
                >
                  Last Name *
                </label>
                <input
                  id="new_last_name"
                  type="text"
                  required
                  value={newGuest.last_name}
                  onChange={(e) =>
                    setNewGuest((prev) => ({ ...prev, last_name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border border-wedding-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
                  placeholder="Last name"
                />
              </div>

              {addError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800">
                  {addError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-wedding-maroon text-white px-4 py-2 rounded-lg font-semibold hover:bg-wedding-maroon-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Adding...' : 'Add Guest'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 border border-wedding-beige-dark text-wedding-maroon px-4 py-2 rounded-lg font-semibold hover:bg-wedding-beige-light transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

