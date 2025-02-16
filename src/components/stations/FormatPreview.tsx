'use client'

interface FormatPreviewProps {
  data: {
    demographic: {
      x: number
      y: number
    }
    sliders: {
      incomeLevel: number
      brandAffinity: number
      culturalInfluence: number
      socialEngagement: number
    }
  }
}

export default function FormatPreview({ data }: FormatPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Target Demographic</h3>
          <p className="text-lg text-gray-200">
            {data.demographic.x}% Young, {data.demographic.y}% Urban
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">Format Style</h3>
          <p className="text-lg text-gray-200">
            Contemporary Hit Radio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Income Level</h3>
          <p className="text-lg text-gray-200">{data.sliders.incomeLevel}%</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">Brand Affinity</h3>
          <p className="text-lg text-gray-200">{data.sliders.brandAffinity}%</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">Cultural Influence</h3>
          <p className="text-lg text-gray-200">{data.sliders.culturalInfluence}%</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">Social Engagement</h3>
          <p className="text-lg text-gray-200">{data.sliders.socialEngagement}%</p>
        </div>
      </div>
    </div>
  )
} 