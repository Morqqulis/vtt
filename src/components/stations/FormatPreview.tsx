'use client'

import { FormatData } from '@/app/(dashboard)/stations/[id]/format/page'

interface FormatPreviewProps {
	formatData: FormatData
}

export default function FormatPreview({ formatData }: FormatPreviewProps) {
	return (
		<div className='space-y-4'>
			<div className='gap-4 grid grid-cols-2'>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Target Demographic</h3>
					<p className='text-gray-200 text-lg'>
						{formatData.demographic.x}% Young, {formatData.demographic.y}% Urban
					</p>
				</div>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Format Style</h3>
					<p className='text-gray-200 text-lg'>Contemporary Hit Radio</p>
				</div>
			</div>

			<div className='gap-4 grid grid-cols-2'>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Income Level</h3>
					<p className='text-gray-200 text-lg'>{formatData.sliders.incomeLevel}%</p>
				</div>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Brand Affinity</h3>
					<p className='text-gray-200 text-lg'>{formatData.sliders.brandAffinity}%</p>
				</div>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Cultural Influence</h3>
					<p className='text-gray-200 text-lg'>{formatData.sliders.culturalInfluence}%</p>
				</div>
				<div>
					<h3 className='font-medium text-gray-400 text-sm'>Social Engagement</h3>
					<p className='text-gray-200 text-lg'>{formatData.sliders.socialEngagement}%</p>
				</div>
			</div>
		</div>
	)
}
