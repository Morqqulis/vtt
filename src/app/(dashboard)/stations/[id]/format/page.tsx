'use client'

import FormatPreview from '@/components/stations/FormatPreview'
import FormatSliders from '@/components/stations/FormatSliders'
import FormatSpiderChart from '@/components/stations/FormatSpiderChart'
import { useState } from 'react'

export interface FormatData {
	demographic: {
		x: number // Conservative (0) ↔ Experimental (100)
		y: number // Older (0) ↔ Younger (100)
	}
	sliders: {
		incomeLevel: number
		brandAffinity: number
		culturalInfluence: number
		socialEngagement: number
	}
}

export default function FormatCustomizerPage() {
	const [formatData, setFormatData] = useState<FormatData>({
		demographic: { x: 50, y: 50 },
		sliders: {
			incomeLevel: 50,
			brandAffinity: 50,
			culturalInfluence: 50,
			socialEngagement: 50,
		},
	})

	return (
		<div className='space-y-8'>
			<div className='flex justify-between items-start'>
				<div>
					<h1 className='font-bold text-foreground text-2xl'>Format Customizer</h1>
					<p className='mt-2 text-muted-foreground'>
						Customize your station's format by adjusting the demographic target and style parameters
					</p>
				</div>
			</div>

			<div className='gap-8 grid grid-cols-1 lg:grid-cols-2'>
				{/* Spider Chart Section */}
				<div className='p-6 card'>
					<h2 className='mb-4 font-semibold text-lg'>Demographic Targeting</h2>
					<FormatSpiderChart
						data={formatData.demographic}
						onChange={demographic => setFormatData({ ...formatData, demographic })}
					/>
				</div>

				{/* Sliders Section */}
				<div className='p-6 card'>
					<h2 className='mb-4 font-semibold text-lg'>Style Parameters</h2>
					<FormatSliders
						values={formatData.sliders}
						onChange={sliders => setFormatData({ ...formatData, sliders })}
					/>
				</div>
			</div>

			{/* Format Preview */}
			<div className='p-6 card'>
				<h2 className='mb-4 font-semibold text-lg'>Format Preview</h2>
				<FormatPreview formatData={formatData} />
			</div>
		</div>
	)
}
