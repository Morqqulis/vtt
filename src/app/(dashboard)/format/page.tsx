'use client'

import PromptsEditor from '@/components/prompts/PromptsEditor'
import FormatPreview from '@/components/stations/FormatPreview'
import FormatSliders from '@/components/stations/FormatSliders'
import FormatSpiderChart from '@/components/stations/FormatSpiderChart'
import NewsBalanceControls from '@/components/stations/NewsBalanceControls'
import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Station, StationPrompt } from '@/lib/types'
import { useEffect, useState } from 'react'

interface FormatData {
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
	newsBalance: {
		values: Record<string, number>
		duration: number // in seconds
	}
}

interface GeneratedPrompts {
	system: string
	hourly: StationPrompt[]
}

export default function FormatCustomizerPage() {
	const [stations, setStations] = useState<Station[]>([])
	const [selectedStation, setSelectedStation] = useState<Station | null>(null)
	const [formatData, setFormatData] = useState<FormatData>({
		demographic: { x: 50, y: 50 },
		sliders: {
			incomeLevel: 50,
			brandAffinity: 50,
			culturalInfluence: 50,
			socialEngagement: 50,
		},
		newsBalance: {
			values: {
				general: 20,
				world: 15,
				nation: 15,
				business: 10,
				technology: 10,
				entertainment: 10,
				sports: 10,
				science: 5,
				health: 5,
			},
			duration: 60, // 1 minute default
		},
	})
	const [isGenerating, setIsGenerating] = useState(false)
	const [showPromptsModal, setShowPromptsModal] = useState(false)
	const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null)
	const [position, setPosition] = useState({ x: 400, y: 300 })
	const [sliders, setSliders] = useState({
		incomeLevel: 50,
		brandAffinity: 50,
		culturalInfluence: 50,
		socialEngagement: 50,
	})

	useEffect(() => {
		fetchStations()
	}, [])

	const fetchStations = async () => {
		try {
			const response = await fetch('/api/stations')
			if (!response.ok) throw new Error('Failed to fetch stations')
			const data = await response.json()
			setStations(data)
		} catch (error) {
			console.error('Error fetching stations:', error)
		}
	}

	const handleSave = async () => {
		if (!selectedStation) {
			alert('Please select a station first')
			return
		}

		try {
			// TODO: Implement save functionality
			console.log('Saving format data for station:', selectedStation.id, formatData)
		} catch (error) {
			console.error('Failed to save format:', error)
		}
	}

	const handleGeneratePrompts = async () => {
		setIsGenerating(true)
		try {
			const response = await fetch('/api/prompts/generate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					format: 'CHR', // Could be made dynamic
					language: 'en',
				}),
			})

			const data = await response.json()
			setGeneratedPrompts(data)
			setShowPromptsModal(true)
		} catch (error) {
			console.error('Failed to generate prompts:', error)
		} finally {
			setIsGenerating(false)
		}
	}

	const handleSavePrompts = async (updatedPrompts: GeneratedPrompts) => {
		try {
			await fetch('/api/prompts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedPrompts),
			})
			setShowPromptsModal(false)
		} catch (error) {
			console.error('Failed to save prompts:', error)
		}
	}

	const handleSliderChange = (name: string, value: number[]) => {
		setSliders(prev => ({
			...prev,
			[name]: value[0],
		}))
	}

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

			{/* Station Selector */}
			<div className='p-6 card'>
				<h2 className='mb-4 font-semibold text-lg'>Select Station</h2>
				<div className='flex items-center gap-4'>
					<select
						value={selectedStation?.id || ''}
						onChange={e => {
							const station = stations.find(s => s.id === parseInt(e.target.value))
							setSelectedStation(station || null)
						}}
						className='bg-background px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-md text-foreground'>
						<option value=''>Select a station...</option>
						{stations.map(station => (
							<option key={station.id} value={station.id}>
								{station.name}
							</option>
						))}
					</select>
				</div>
			</div>

			{selectedStation ? (
				<div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
					{/* Left Column */}
					<div className='space-y-6'>
						<div className='p-6 card'>
							<h2 className='mb-4 font-semibold text-lg'>Demographic Targeting</h2>
							<FormatSpiderChart
								data={formatData.demographic}
								onChange={demographic => setFormatData(prev => ({ ...prev, demographic }))}
							/>
						</div>
						<div className='p-6 card'>
							<h2 className='mb-4 font-semibold text-lg'>Format Preview</h2>
							<FormatPreview formatData={formatData} />
						</div>
					</div>

					{/* Right Column */}
					<div className='p-6 card'>
						<h2 className='mb-4 font-semibold text-lg'>Style Parameters</h2>
						<FormatSliders
							values={formatData.sliders}
							onChange={sliders => setFormatData(prev => ({ ...prev, sliders }))}
						/>

						<div className='p-6 card'>
							<h2 className='mb-4 font-semibold text-lg'>News Balance</h2>
							<NewsBalanceControls
								values={formatData.newsBalance.values}
								duration={formatData.newsBalance.duration}
								onChange={(values, duration) =>
									setFormatData(prev => ({
										...prev,
										newsBalance: { values, duration },
									}))
								}
							/>
						</div>

						<div className='flex justify-end gap-4 mt-6 pt-6 border-gray-700 border-t'>
							<ShimmerButton onClick={handleGeneratePrompts} disabled={isGenerating}>
								{isGenerating ? 'Generating...' : 'Generate Prompts'}
							</ShimmerButton>
							<Button onClick={handleSave}>Save Format</Button>
						</div>
					</div>
				</div>
			) : (
				<div className='p-6 text-muted-foreground text-center card'>
					Please select a station to customize its format
				</div>
			)}

			<Modal isOpen={showPromptsModal} onClose={() => setShowPromptsModal(false)} title='Generated Prompts'>
				<PromptsEditor
					prompts={generatedPrompts}
					onSave={handleSavePrompts}
					onCancel={() => setShowPromptsModal(false)}
				/>
			</Modal>
		</div>
	)
}
