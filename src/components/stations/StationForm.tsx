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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Client, Location, Station } from '@/types'
import { useState } from 'react'

interface StationFormProps {
  onSubmit: (data: Partial<Station>) => void
  locations: Location[]
  clients: Client[]
  initialData?: Station
}

export default function StationForm({ onSubmit, locations, clients, initialData }: StationFormProps) {
  const [formData, setFormData] = useState<Partial<Station>>(initialData || {})
  const [activeTab, setActiveTab] = useState('general')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof Station, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <div className="gap-4 grid grid-cols-2">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <div>
                <Label>Station Name</Label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="bg-[#282828] border-gray-700"
                />
              </div>

              <div>
                <Label>Station ID</Label>
                <Input
                  value={formData.stationId || ''}
                  onChange={(e) => handleChange('stationId', e.target.value)}
                  className="bg-[#282828] border-gray-700"
                />
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  value={formData.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className="bg-[#282828] border-gray-700"
                />
              </div>
            </div>

            {/* Location & Client Section */}
            <div className="space-y-4">
              <div>
                <Label>Location</Label>
                <Select
                  value={formData.locationId?.toString() || ''}
                  onValueChange={(value) => handleChange('locationId', Number(value))}
                >
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    {locations.map((location) => (
                      <SelectItem 
                        key={location.id} 
                        value={location.id.toString()}
                        className="hover:bg-[#282828] text-gray-200"
                      >
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Client</Label>
                <Select
                  value={formData.clientId?.toString() || ''}
                  onValueChange={(value) => handleChange('clientId', Number(value))}
                >
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    {clients.map((client) => (
                      <SelectItem 
                        key={client.id} 
                        value={client.id.toString()}
                        className="hover:bg-[#282828] text-gray-200"
                      >
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status || ''}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    <SelectItem value="active" className="hover:bg-[#282828] text-gray-200">Active</SelectItem>
                    <SelectItem value="inactive" className="hover:bg-[#282828] text-gray-200">Inactive</SelectItem>
                    <SelectItem value="maintenance" className="hover:bg-[#282828] text-gray-200">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="auth" className="space-y-4 mt-4">
          <div className="gap-4 grid grid-cols-2">
            <div>
              <Label>Username</Label>
              <Input
                value={formData.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
                className="bg-[#282828] border-gray-700"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={formData.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                className="bg-[#282828] border-gray-700"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prompts" className="mt-4">
          <div className="space-y-4 pr-4 max-h-[60vh] overflow-y-auto">
            {/* System Prompt */}
            <div>
              <Label>System Prompt</Label>
              <Input
                value={formData.systemPrompt || ''}
                onChange={(e) => handleChange('systemPrompt', e.target.value)}
                className="bg-[#282828] border-gray-700"
              />
            </div>

            {/* Hourly Prompts */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-400 text-sm">Hourly Prompts</h3>
              <div className="gap-4 grid grid-cols-2">
                {[0, 10, 20, 30, 40, 50, 55].map((minute) => (
                  <div key={minute}>
                    <Label>HH:{minute.toString().padStart(2, '0')}</Label>
                    <Input
                      value={formData[`hourlyPrompt${minute}`] || ''}
                      onChange={(e) => handleChange(`hourlyPrompt${minute}`, e.target.value)}
                      className="bg-[#282828] border-gray-700"
                      placeholder={`Enter prompt for XX:${minute}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Special Prompts */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-400 text-sm">Special Prompts</h3>
              <div className="gap-4 grid grid-cols-2">
                {['news', 'weather', 'traffic'].map((type) => (
                  <div key={type}>
                    <Label className="capitalize">{type} Prompt</Label>
                    <Input
                      value={formData[`${type}Prompt`] || ''}
                      onChange={(e) => handleChange(`${type}Prompt`, e.target.value)}
                      className="bg-[#282828] border-gray-700"
                      placeholder={`Enter ${type} prompt`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bottom-0 sticky bg-[#1a1a1a] pt-4">
        <Button 
          type="submit" 
          className="bg-red-700 hover:bg-red-800 w-full"
        >
          {initialData ? 'Update Station' : 'Add Station'}
        </Button>
      </div>
    </form>
  )
} 