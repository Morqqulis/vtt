'use client'

import LocationForm from '@/components/locations/LocationForm'
import { Button } from '@/components/ui/Button'
import CustomDialog from '@/components/ui/CustomDialog'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Location } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const locationsTableHeaders = ['Country', 'City', 'Timezone', 'Actions']

export default function LocationsPage() {
	const queryClient = useQueryClient()
	const [locations, setLocations] = useState<Location[]>([])
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [editingLocation, setEditingLocation] = useState<Location | null>(null)

	const { data, error, isLoading } = useQuery({
		queryKey: ['locations'],
		queryFn: async () => {
			const response = await fetch('/api/locations')
			if (!response.ok) {
				throw new Error('Failed to fetch locations')
			}
			return response.json()
		},
	})

	useEffect(() => {
		if (data) {
			setLocations(data)
		}
	}, [data])

	const handleAddLocation = useMutation({
		mutationFn: (newLocation: Partial<Location>) => axios.post('/api/locations', newLocation).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] })
		},
	})

	const handleEditLocation = useMutation({
		mutationFn: async (updatedLocation: Partial<Location>) => {
			if (!updatedLocation.id) {
				throw new Error('Location ID is required')
			}

			const response = await axios.put(`/api/locations/${updatedLocation.id}`, {
				code: updatedLocation.code,
				city: updatedLocation.city,
				country: updatedLocation.country,
				timezone: updatedLocation.timezone,
			})

			if (!response.data) {
				throw new Error('Failed to update location')
			}

			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] })
		},
		onError: error => {
			console.error('Error updating location:', error)
		},
	})

	const handleDeleteLocation = useMutation({
		mutationFn: (locationId: number) => axios.delete(`/api/locations/${locationId}`).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] })
		},
	})

	// useEffect(() => {
	// 	fetchLocations()
	// }, [])

	// const fetchLocations = async () => {
	// 	try {
	// 		// Use mock data in development
	// 		// if (process.env.NODE_ENV === 'development') {
	// 		// 	setLocations(mockLocations)
	// 		// 	setLoading(false)
	// 		// 	return
	// 		// }

	// 		const response = await fetch('/api/locations')
	// 		if (!response.ok) throw new Error('Failed to fetch locations')
	// 		const data = await response.json()
	// 		setLocations(data)
	// 	} catch (error) {
	// 		console.error('Error fetching locations:', error)
	// 		setError(error instanceof Error ? error.message : 'Failed to fetch locations')
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	// const handleAddLocation = async (newLocation: Partial<Location>) => {
	// 	try {
	// 		const response = await fetch('/api/locations', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify(newLocation),
	// 		})
	// 		const data = await response.json()
	// 		setLocations([...locations, data])
	// 		setIsAddModalOpen(false)
	// 	} catch (error) {
	// 		console.error('Error adding location:', error)
	// 	}
	// }

	// const handleEditLocation = async (updatedLocation: Partial<Location>) => {
	// 	try {
	// 		if (!editingLocation?.id) return

	// 		const response = await fetch(`/api/locations/${editingLocation.id}`, {
	// 			method: 'PUT',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({
	// 				name: updatedLocation.name,
	// 				country: updatedLocation.country,
	// 				city: updatedLocation.city,
	// 				timezone: updatedLocation.timezone,
	// 			}),
	// 		})

	// 		if (!response.ok) {
	// 			throw new Error('Failed to update location')
	// 		}

	// 		const data = await response.json()

	// 		setLocations(locations.map(location => (location.id === editingLocation.id ? data : location)))
	// 		setEditingLocation(null)
	// 	} catch (error) {
	// 		console.error('Error updating location:', error)
	// 		// Optionally add error handling UI here
	// 	}
	// }

	// const handleDeleteLocation = async (locationId: number) => {
	// 	if (!confirm('Are you sure you want to delete this location?')) return

	// 	try {
	// 		await fetch(`/api/locations/${locationId}`, {
	// 			method: 'DELETE',
	// 		})
	// 		setLocations(locations.filter(location => location.id !== locationId))
	// 	} catch (error) {
	// 		console.error('Error deleting location:', error)
	// 	}
	// }

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<LoadingWrapper>
			<div className='space-y-6'>
				<div className='flex justify-between items-center'>
					<h1 className='font-semibold text-foreground text-2xl'>Locations</h1>
					<CustomDialog
						title={'Add Location'}
						triggerChildren={
							<Button className={`bg-red-700 hover:bg-red-800`} variant={'destructive'}>
								Add Location
							</Button>
						}
						contentChildren={<LocationForm onSubmit={handleAddLocation.mutate} />}
					/>

					{/* <Button onClick={() => setIsAddModalOpen(true)} className='bg-red-700 hover:bg-red-800'>
						Add Location
					</Button> */}
				</div>

				{locations.length === 0 ? (
					<div className='bg-card p-6 border border-border rounded-lg text-muted-foreground text-center'>
						No locations found. Add your first location to get started.
					</div>
				) : (
					<div className='bg-card border border-border rounded-lg overflow-hidden'>
						<table className='w-full overflow-auto'>
							<thead className='bg-muted'>
								<tr>
									{locationsTableHeaders.map(header => (
										<th
											key={header}
											className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
											{header}
										</th>
									))}
								</tr>
							</thead>
							<tbody className='divide-y divide-border'>
								{locations.map(location => (
									<tr key={location.id}>
										{/* <td className='px-6 py-4 text-foreground text-sm'>{location.name}</td> */}
										<td className='px-4 py-2 text-muted-foreground text-sm'>{location.country}</td>
										<td className='px-4 py-2 text-muted-foreground text-sm'>{location.city}</td>
										<td className='px-4 py-2 text-muted-foreground text-sm'>{location.timezone}</td>
										<td className='px-4 py-2 text-sm'>
											<div className='flex items-center gap-2'>
												<CustomDialog
													className={`max-w-2xl`}
													title={'Edit Location'}
													triggerChildren={
														<Button size={'icon'} variant={'ghost'}>
															<PencilIcon className='w-5 h-5' />
														</Button>
													}
													contentChildren={
														<LocationForm initialData={location} onSubmit={handleEditLocation.mutate} />
													}
												/>

												{/* <button
													onClick={() => setEditingLocation(location)}
													className='p-2 hover:text-primary'>
													<PencilIcon className='w-5 h-5' />
												</button> */}
												<Button onClick={() => handleDeleteLocation.mutate(location.id)} variant={'ghost'}>
													<TrashIcon className='w-5 h-5 text-red-500' />
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title='Add Location'>
					<LocationForm
						onSubmit={async data => {
							await handleAddLocation.mutate(data)
							setIsAddModalOpen(false)
						}}
					/>
				</Modal> */}

				{/* <Modal isOpen={!!editingLocation} onClose={() => setEditingLocation(null)} title='Edit Location'>
					{editingLocation && (
						<LocationForm
							initialData={editingLocation}
							onSubmit={async data => {
								await handleEditLocation.mutateAsync(data)
								setEditingLocation(null)
							}}
						/>
					)}
				</Modal> */}
			</div>
		</LoadingWrapper>
	)
}
