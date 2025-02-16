'use client'

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
// import Modal from '@/components/ui/Modal'
import StationForm from '@/components/forms/StationForm'
import { Button } from '@/components/ui/Button'
import CustomDialog from '@/components/ui/CustomDialog'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Location, Station } from '@prisma/client'

const tableHeaders = [
	{ label: 'Name', key: 'name' },
	{ label: 'Station ID', key: 'stationId' },
	{ label: 'Location', key: 'location' },
	{ label: 'Website', key: 'website' },
	{ label: 'Status', key: 'status' },
	{ label: 'Actions', key: 'actions' },
]

export default function StationsPage() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const [editingStation, setEditingStation] = useState<Station | null>(null)

	const [
		{ data: locations, isLoading: locationsLoading, error: locationsError },
		{ data: stations, isLoading: stationsLoading, error: stationsError },
	] = useQueries({
		queries: [
			{ queryKey: ['locations'], queryFn: () => axios.get('/api/locations').then(res => res.data) },
			{ queryKey: ['stations'], queryFn: () => axios.get('/api/stations').then(res => res.data) },
		],
	})

	const handleAddStation = useMutation({
		mutationFn: (newStation: Partial<Station>) => axios.post('/api/stations', newStation).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['stations'] })
		},
	})

	const handleEditStation = useMutation({
		mutationFn: (updatedStation: Partial<Station>) =>
			axios.put(`/api/stations/${editingStation?.id}`, updatedStation).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['stations'] })
			setEditingStation(null)
		},
	})

	const handleDeleteStation = useMutation({
		mutationFn: (stationId: number) => axios.delete(`/api/stations/${stationId}`).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['stations'] })
		},
	})

	if (locationsLoading || stationsLoading) {
		return <div className='text-muted-foreground text-center'>Loading stations...</div>
	}

	if (locationsError || stationsError) {
		return (
			<div className='text-red-600'>
				{locationsError?.message || stationsError?.message}
				<button
					onClick={() => queryClient.invalidateQueries()}
					className='ml-4 text-indigo-600 hover:text-indigo-800'>
					Retry
				</button>
			</div>
		)
	}

	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			{/* Header */}
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='font-semibold text-foreground text-2xl'>Stations</h1>
					<p className='mt-2 text-muted-foreground text-sm'>A list of all radio stations using RadioCopilot</p>
				</div>
				<div className='sm:flex-none mt-4 sm:mt-0 sm:ml-16'>
					<CustomDialog
						className={`max-w-2xl`}
						title='Add New Station'
						triggerChildren={
							<Button className='bg-red-700 hover:bg-red-800 rounded-full text-white'>
								<PlusIcon className='mr-2 w-4 h-4' /> Add Station
							</Button>
						}
						contentChildren={
							<StationForm locations={locations} onSubmit={handleAddStation.mutate} inModal={true} />
						}
					/>
				</div>
			</div>

			{/* Table */}
			<div className='bg-card shadow-sm mt-8 ring-border rounded-lg ring-1 overflow-hidden'>
				<table className='divide-y divide-border min-w-full'>
					{/* Table Headers */}
					<thead className='bg-muted'>
						<tr>
							{tableHeaders.map(header => (
								<th
									key={header.key}
									className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									{header.label}
								</th>
							))}
						</tr>
					</thead>
					{/* Table Body */}
					<tbody className='bg-card divide-y divide-border'>
						{stations.map((station: Station) => {
							const location = locations.find((l: Location) => l.id === station.locationId)
							return (
								<tr key={station.id} className='[&>td]:px-6 [&>td]:py-4'>
									<td className='whitespace-nowrap'>
										<div className='font-medium text-foreground text-sm'>{station.name}</div>
									</td>
									<td className='text-muted-foreground text-sm whitespace-nowrap'>{station.stationId}</td>
									<td className='text-muted-foreground text-sm whitespace-nowrap'>
										{location ? `${location.city}, ${location.country}` : 'Unknown'}
									</td>
									<td className='text-muted-foreground text-sm whitespace-nowrap'>{station.website}</td>
									<td className='whitespace-nowrap'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
											${station.status === 'active' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
											{station.status}
										</span>
									</td>
									<td className='px-2 py-4 font-medium text-sm whitespace-nowrap'>
										<CustomDialog
											className={`max-w-2xl`}
											title='Edit Station'
											triggerChildren={
												<Button
													onClick={() => setEditingStation(station)}
													className='mr-4 text-primary hover:text-primary/80'
													size='icon'
													variant='ghost'>
													<PencilIcon className='w-5 h-5' />
												</Button>
											}
											contentChildren={
												<StationForm
													initialData={editingStation || undefined}
													locations={locations}
													onSubmit={handleEditStation.mutate}
													inModal={true}
												/>
											}
										/>
										<Button
											onClick={() => handleDeleteStation.mutate(station.id)}
											className='text-destructive hover:text-destructive/80'
											size='icon'
											variant='ghost'>
											<TrashIcon className='w-5 h-5' />
										</Button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
