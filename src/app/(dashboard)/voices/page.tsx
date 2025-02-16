'use client'

import VoiceForm from '@/components/forms/VoiceForm'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { mockVoices } from '@/lib/mockData'
import { Voice } from '@/lib/types'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function VoicesPage() {
  const [voices, setVoices] = useState<Voice[]>(mockVoices)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVoice, setEditingVoice] = useState<Voice | null>(null)

  const handleAdd = () => {
    setEditingVoice(null)
    setIsModalOpen(true)
  }

  const handleEdit = (voice: Voice) => {
    setEditingVoice(voice)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setVoices(voices.filter(voice => voice.id !== id))
  }

  const handleSubmit = (voiceData: Partial<Voice>) => {
    if (editingVoice) {
      setVoices(voices.map(voice => 
        voice.id === editingVoice.id ? { ...voice, ...voiceData } : voice
      ))
    } else {
      setVoices([...voices, { id: Math.random().toString(), ...voiceData } as Voice])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-200 text-2xl">Voices</h1>
        <Button 
          onClick={handleAdd}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Voice
        </Button>
      </div>

      <div className="border border-gray-800 rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] border-gray-800 border-b">
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Name</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Voice ID</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Category</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Language/Accent</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Country</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Status</th>
                <th className="px-4 py-3 font-medium text-gray-400 text-sm text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {voices.map((voice) => (
                <tr key={voice.id} className="hover:bg-[#1a1a1a]">
                  <td className="px-4 py-3 text-gray-200 text-sm">{voice.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{voice.voiceId}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{voice.category}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-200 text-sm">{voice.language}</div>
                    {voice.accent && (
                      <div className="text-gray-400 text-sm">{voice.accent}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {voice.country}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${voice.status === 'active' 
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {voice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(voice)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(voice.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVoice ? 'Edit Voice' : 'Add Voice'}
      >
        <VoiceForm
          initialData={editingVoice || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
} 