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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiKey, setApiKey] = useState("rcp_c02c06d561db245fa6891f61e5")

  const handleCopyApiKey = async () => {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateApiKey = () => {
    const randomStr = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 24)
    return `rcp_${randomStr}`
  }

  const handleGenerateNewApiKey = () => {
    const newKey = generateApiKey()
    setApiKey(newKey)
    // Here you would typically make an API call to save the new key
    // For example:
    // await fetch('/api/settings/generate-key', { method: 'POST' })
  }

  const handleSave = async () => {
    setLoading(true)
    // Add your save logic here
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-200 text-2xl">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#282828] border-gray-700">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <div className="bg-[#1a1a1a] p-6 border border-gray-800 rounded-md">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Station Name</Label>
                <Input 
                  placeholder="Enter station name"
                  className="bg-[#282828] border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select>
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    <SelectItem value="en" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      English
                    </SelectItem>
                    <SelectItem value="de" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      German
                    </SelectItem>
                    <SelectItem value="fr" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      French
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select>
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    <SelectItem value="utc" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      UTC
                    </SelectItem>
                    <SelectItem value="est" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="cet" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      Central European Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="api" className="space-y-6 mt-6">
          <div className="bg-[#1a1a1a] p-6 border border-gray-800 rounded-md">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      value={apiKey}
                      className="bg-[#282828] pr-24 border-gray-700 font-mono text-sm"
                      readOnly
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="top-1/2 right-2 absolute hover:bg-gray-700 h-7 -translate-y-1/2"
                      onClick={handleCopyApiKey}
                    >
                      {copied ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                      ) : (
                        <ClipboardIcon className="w-4 h-4" />
                      )}
                      <span className="ml-2 text-xs">
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={handleGenerateNewApiKey}
                  >
                    Generate New
                  </Button>
                </div>
                <p className="mt-1 text-gray-400 text-xs">
                  Keep this key secret. If compromised, generate a new one immediately.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <Input 
                  placeholder="https://"
                  className="bg-[#282828] border-gray-700"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <div className="bg-[#1a1a1a] p-6 border border-gray-800 rounded-md">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <Select>
                  <SelectTrigger className="bg-[#282828] border-gray-700">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    <SelectItem value="instant" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      Instant
                    </SelectItem>
                    <SelectItem value="daily" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      Daily Digest
                    </SelectItem>
                    <SelectItem value="weekly" className="hover:bg-[#282828] focus:bg-[#282828] text-gray-200">
                      Weekly Summary
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notification Email</Label>
                <Input 
                  type="email"
                  placeholder="Enter email address"
                  className="bg-[#282828] border-gray-700"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="min-w-[100px]"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
} 