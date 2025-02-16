'use client'

import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface NewsCategory {
  id: string
  label: string
}

const NEWS_CATEGORIES: NewsCategory[] = [
  { id: 'general', label: 'General News' },
  { id: 'world', label: 'World News' },
  { id: 'nation', label: 'National News' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
]

interface NewsBalanceControlsProps {
  values: Record<string, number>
  duration: number // in seconds
  onChange: (values: Record<string, number>, duration: number) => void
}

export default function NewsBalanceControls({ 
  values, 
  duration = 60,
  onChange 
}: NewsBalanceControlsProps) {
  const handleChange = (categoryId: string, value: number[]) => {
    const newValue = value[0]
    const oldValue = values[categoryId]
    const diff = newValue - oldValue

    // Calculate how much to distribute to other categories
    const otherCategories = NEWS_CATEGORIES.filter(cat => cat.id !== categoryId)
    const totalOtherValues = otherCategories.reduce((sum, cat) => sum + values[cat.id], 0)
    
    if (totalOtherValues === 0 && diff > 0) {
      // If all others are 0, distribute evenly
      const newValues = { ...values }
      const remaining = 100 - newValue
      otherCategories.forEach(cat => {
        newValues[cat.id] = remaining / otherCategories.length
      })
      newValues[categoryId] = newValue
      onChange(newValues, duration)
      return
    }

    // Proportionally adjust other values
    const newValues = { ...values }
    newValues[categoryId] = newValue

    otherCategories.forEach(cat => {
      const proportion = values[cat.id] / totalOtherValues
      newValues[cat.id] = Math.max(0, values[cat.id] - (diff * proportion))
    })

    // Normalize to ensure total is exactly 100
    const total = Object.values(newValues).reduce((sum, val) => sum + val, 0)
    if (total !== 100) {
      const factor = 100 / total
      Object.keys(newValues).forEach(key => {
        newValues[key] *= factor
      })
    }

    onChange(newValues, duration)
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleDurationChange = (value: string) => {
    const [minutes, seconds] = value.split(':').map(Number)
    const newDuration = (minutes * 60) + (seconds || 0)
    onChange(values, newDuration)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-400">Duration</label>
        <Input
          type="text"
          value={formatDuration(duration)}
          onChange={(e) => handleDurationChange(e.target.value)}
          className="w-20 text-center"
          placeholder="1:00"
        />
      </div>

      {NEWS_CATEGORIES.map((category) => (
        <div key={category.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-400">{category.label}</label>
            <span className="text-sm text-gray-400">{Math.round(values[category.id])}%</span>
          </div>
          <Slider
            value={[values[category.id]]}
            max={100}
            step={1}
            onValueChange={(value) => handleChange(category.id, value)}
          />
        </div>
      ))}
    </div>
  )
} 