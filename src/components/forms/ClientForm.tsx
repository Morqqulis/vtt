'use client'

import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Client } from '@prisma/client'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { DialogClose } from '../ui/dialog'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	company: z.string().min(2, {
		message: 'Company name must be at least 2 characters.',
	}),
	website: z.string().url().optional().or(z.literal('')),
	logo: z.string().url().optional().or(z.literal('')),
	status: z.enum(['active', 'inactive']),
	stationIds: z.array(z.number()).default([]),
})

type FormData = z.infer<typeof formSchema>

interface ClientFormProps {
	initialData?: Client
	stations?: { id: number; name: string }[]
	onSubmit: (data: Partial<Client>) => void
	onCancel?: () => void
	inModal: boolean
}

export default function ClientForm({
	initialData,
	stations = [],
	onSubmit,
	onCancel,
	inModal = false,
}: ClientFormProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || '',
			email: initialData?.email || '',
			company: initialData?.company || '',
			website: initialData?.website || '',
			logo: initialData?.logo || '',
			status: (initialData?.status as 'active' | 'inactive') || 'active',
			stationIds: initialData?.stationIds || [],
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
				<div className='gap-6 grid'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Name</FormLabel>
								<FormControl>
									<Input placeholder='John Doe' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Email</FormLabel>
								<FormControl>
									<Input placeholder='john@example.com' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='company'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Company</FormLabel>
								<FormControl>
									<Input placeholder='Company Name' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='website'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Website</FormLabel>
								<FormControl>
									<Input type='url' placeholder='https://example.com' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='logo'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Logo URL</FormLabel>
								<FormControl>
									<Input type='url' placeholder='https://example.com/logo.png' {...field} />
								</FormControl>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Status</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a status' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='active'>Active</SelectItem>
										<SelectItem value='inactive'>Inactive</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='stationIds'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-gray-200'>Stations</FormLabel>
								<Select
									onValueChange={value => {
										const numValue = parseInt(value)
										if (!field.value.includes(numValue)) {
											field.onChange([...field.value, numValue])
										}
									}}
									value={field.value?.length ? field.value[0].toString() : undefined}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select stations' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{stations.map(station => (
											<SelectItem
												key={station.id}
												value={station.id.toString()}
												disabled={field.value.includes(station.id)}>
												{station.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{field.value.length > 0 && (
									<div className='flex flex-wrap gap-2 mt-2'>
										{field.value.map(stationId => {
											const station = stations.find(s => s.id === stationId)
											return station ? (
												<div
													key={stationId}
													className='flex items-center gap-1 bg-gray-700 px-2 py-1 rounded'>
													<span>{station.name}</span>
													<button
														type='button'
														onClick={() => {
															field.onChange(field.value.filter(id => id !== stationId))
														}}
														className='text-gray-400 hover:text-gray-200'>
														×
													</button>
												</div>
											) : null
										})}
									</div>
								)}
								<FormMessage className='text-red-500' />
							</FormItem>
						)}
					/>
				</div>

				<div className='flex justify-end space-x-4 pt-6 border-gray-700 border-t'>
					{inModal ? (
						<>
							<DialogClose asChild>
								<Button type='button' variant='outline' onClick={onCancel}>
									Cancel
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button className={`bg-red-700`} variant={'destructive'} type='submit'>
									{initialData ? 'Update Client' : 'Add Client'}
								</Button>
							</DialogClose>
						</>
					) : (
						<>
							<Button type='button' variant='outline' onClick={onCancel}>
								Cancel
							</Button>
							<Button className={`bg-red-700`} variant={'destructive'} type='submit'>
								{initialData ? 'Update Client' : 'Add Client'}
							</Button>
						</>
					)}
				</div>
			</form>
		</Form>
	)
}
