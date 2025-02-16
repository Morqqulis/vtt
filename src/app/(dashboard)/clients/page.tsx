'use client'

import ClientForm from '@/components/forms/ClientForm'
import { Button } from '@/components/ui/Button'
import CustomDialog from '@/components/ui/CustomDialog'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import LoadingWrapper from '@/components/ui/LoadingWrapper'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Client, Station } from '@prisma/client'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

export default function ClientsPage() {
	const queryClient = useQueryClient()
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [editingClient, setEditingClient] = useState<Client | null>(null)

	const [clientsQuery, stationsQuery] = useQueries({
		queries: [
			{
				queryKey: ['clients'],
				queryFn: () => axios.get('/api/clients').then(res => res.data),
			},
			{
				queryKey: ['stations'],
				queryFn: () => axios.get('/api/stations').then(res => res.data),
			},
		],
	})

	const [
		{ data: clients, isLoading: clientsLoading, error: clientsError },
		{ data: stations, isLoading: stationsLoading, error: stationsError },
	] = [clientsQuery, stationsQuery]

	const handleAddClient = useMutation({
		mutationFn: (newClient: Partial<Client>) => axios.post('/api/clients', newClient).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['clients'] })
		},
	})

	const handleEditClient = useMutation({
		mutationFn: (updatedClient: Partial<Client>) =>
			axios.put(`/api/clients/${editingClient?.id}`, updatedClient).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['clients'] })
		},
	})

	const handleDeleteClient = useMutation({
		mutationFn: (clientId: number) => axios.delete(`/api/clients/${clientId}`).then(res => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['clients'] })
		},
	})

	if (clientsLoading || stationsLoading) {
		return <div className={`text-center text-muted-foreground`}>Loading clients...</div>
	}

	if (clientsError || stationsError) {
		return (
			<div className='text-red-600'>
				{clientsError?.message || stationsError?.message}
				<button
					onClick={() => (clientsError ? clientsQuery.refetch() : stationsQuery.refetch())}
					className='ml-4 text-indigo-600 hover:text-indigo-800'>
					Retry
				</button>
			</div>
		)
	}

	return (
		<LoadingWrapper>
			<div>
				<div className='sm:flex sm:items-center'>
					<div className='sm:flex-auto'>
						<h1 className='font-semibold text-foreground text-2xl'>Clients</h1>
						<p className='mt-2 text-muted-foreground text-sm'>A list of all clients using RadioCopilot</p>
					</div>
					<div className='sm:flex-none mt-4 sm:mt-0 sm:ml-16'>
						<CustomDialog
							className={`max-w-2xl`}
							title='Add New Client'
							triggerChildren={
								<Button className='bg-red-700 hover:bg-red-800 rounded-full text-white'>
									<PlusIcon className='mr-2 w-4 h-4' /> Add Client
								</Button>
							}
							contentChildren={<ClientForm stations={stations} onSubmit={handleAddClient.mutate} inModal />}
						/>
					</div>
				</div>

				<div className='bg-card shadow-sm mt-8 ring-border rounded-lg ring-1 overflow-hidden'>
					<table className='divide-y divide-border min-w-full'>
						<thead className='bg-muted'>
							<tr>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Client
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Company
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Associated Stations
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Status
								</th>
								<th className='px-6 py-3 font-medium text-muted-foreground text-xs text-left uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className='bg-card divide-y divide-border'>
							{clients.map((client: Client) => (
								<tr key={client.id}>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='font-medium text-foreground text-sm'>{client.name}</div>
										<div className='text-muted-foreground text-sm'>{client.email}</div>
									</td>
									<td className='px-6 py-4 text-muted-foreground text-sm whitespace-nowrap'>
										{client.company}
									</td>
									<td className='px-6 py-4 text-muted-foreground text-sm whitespace-nowrap'>
										{client.stationIds
											?.map(id => stations.find((s: Station) => s.id === id)?.name)
											.filter(Boolean)
											.join(', ') || 'No stations'}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
	                    ${client.status === 'active' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'}`}>
											{client.status}
										</span>
									</td>
									<td className='px-6 py-4 font-medium text-sm whitespace-nowrap'>
										<CustomDialog
											title='Edit Client'
											triggerChildren={
												<Button
													onClick={() => setEditingClient(client)}
													className='mr-4 text-primary hover:text-primary/80'
													size={'icon'}
													variant={'ghost'}>
													<PencilIcon className='w-5 h-5' />
												</Button>
											}
											contentChildren={
												<ClientForm
													initialData={editingClient || undefined}
													stations={stations}
													onSubmit={handleEditClient.mutate}
													onCancel={() => setEditingClient(null)}
													inModal
												/>
											}
										/>
										<Button
											onClick={() => handleDeleteClient.mutate(client.id)}
											className='text-destructive hover:text-destructive/80'
											size={'icon'}
											variant={'ghost'}>
											<TrashIcon className='w-5 h-5' />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</LoadingWrapper>
	)

	// return <div>ok</div>
}
