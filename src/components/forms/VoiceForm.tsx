'use client'

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { COUNTRIES } from '@/lib/countries'
import { Voice, VoiceCategory } from '@/lib/types'
import { useState } from 'react'

interface VoiceFormProps {
  initialData?: Voice
  onSubmit: (newVoice: Partial<Voice>) => void
  onCancel: () => void
}

const VOICE_CATEGORIES: { value: VoiceCategory; label: string }[] = [
  { value: 'voicetracking', label: 'Voice Tracking' },
  { value: 'news', label: 'News' },
  { value: 'caller', label: 'Caller' },
]

export default function VoiceForm({ initialData, onSubmit, onCancel }: VoiceFormProps) {
  const [formData, setFormData] = useState<Partial<Voice>>(initialData || {
    name: '',
    voiceId: '',
    gender: 'male',
    language: '',
    accent: '',
    age: undefined,
    category: 'voicetracking',
    country: '',
    status: 'active'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-[#282828] border-gray-700"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Voice ID</Label>
        <Input
          value={formData.voiceId}
          onChange={(e) => setFormData({ ...formData, voiceId: e.target.value })}
          className="bg-[#282828] border-gray-700"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          value={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value as 'male' | 'female' })}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            <SelectItem value="male" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">Male</SelectItem>
            <SelectItem value="female" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Language</Label>
        <Input
          value={formData.language}
          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
          className="bg-[#282828] border-gray-700"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Accent (optional)</Label>
        <Input
          value={formData.accent}
          onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
          className="bg-[#282828] border-gray-700"
        />
      </div>

      <div className="space-y-2">
        <Label>Age (optional)</Label>
        <Input
          type="number"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
          className="bg-[#282828] border-gray-700"
        />
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value as VoiceCategory })}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            {VOICE_CATEGORIES.map(category => (
              <SelectItem 
                key={category.value} 
                value={category.value}
                className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200"
              >
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Country</Label>
        <Select
          value={formData.country}
          onValueChange={(value) => setFormData({ ...formData, country: value })}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            {COUNTRIES.map(country => (
              <SelectItem 
                key={country.code} 
                value={country.code}
                className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200"
              >
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as 'active' | 'inactive' })}
        >
          <SelectTrigger className="bg-[#282828] border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-gray-700">
            <SelectItem value="active" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">Active</SelectItem>
            <SelectItem value="inactive" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Voice' : 'Add Voice'}
        </Button>
      </div>
    </form>
  )
} 