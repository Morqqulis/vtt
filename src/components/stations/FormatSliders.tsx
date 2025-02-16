'use client'

import { Slider } from "@/components/ui/slider"

interface FormatSlidersProps {
  values: {
    incomeLevel: number
    brandAffinity: number
    culturalInfluence: number
    socialEngagement: number
  }
  onChange: (values: {
    incomeLevel: number
    brandAffinity: number
    culturalInfluence: number
    socialEngagement: number
  }) => void
}

export default function FormatSliders({ values, onChange }: FormatSlidersProps) {
  const handleChange = (name: keyof typeof values, value: number[]) => {
    onChange({
      ...values,
      [name]: value[0]
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Income Level</label>
        <Slider
          defaultValue={[values.incomeLevel]}
          max={100}
          step={1}
          onValueChange={(value) => handleChange('incomeLevel', value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Brand Affinity</label>
        <Slider
          defaultValue={[values.brandAffinity]}
          max={100}
          step={1}
          onValueChange={(value) => handleChange('brandAffinity', value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Cultural Influence</label>
        <Slider
          defaultValue={[values.culturalInfluence]}
          max={100}
          step={1}
          onValueChange={(value) => handleChange('culturalInfluence', value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Social Engagement</label>
        <Slider
          defaultValue={[values.socialEngagement]}
          max={100}
          step={1}
          onValueChange={(value) => handleChange('socialEngagement', value)}
        />
      </div>
    </div>
  )
} 