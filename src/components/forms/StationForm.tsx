'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Station } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/Button'
import { DialogClose } from '../ui/dialog'

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	stationId: z
		.number()
		.min(1, {
			message: 'Station ID is required.',
		})
		.or(z.string()),
	locationId: z
		.number()
		.min(1, {
			message: 'Please select a location.',
		})
		.or(z.string()),
	website: z.string().url().optional().or(z.literal('')),
	status: z.enum(['active', 'inactive']),
	omniplayerUrl: z.string().url().optional().or(z.literal('')),
	clientId: z
		.number()
		.min(1, {
			message: 'Client ID is required.',
		})
		.or(z.string()),
	clientSecret: z.string().min(1, {
		message: 'Client Secret is required.',
	}),
	username: z.string().min(1, {
		message: 'Username is required.',
	}),
	password: z.string().min(1, {
		message: 'Password is required.',
	}),
	systemPrompt: z.string().optional(),
	hourlyPrompt0: z.string().optional(),
	hourlyPrompt10: z.string().optional(),
	hourlyPrompt20: z.string().optional(),
	hourlyPrompt30: z.string().optional(),
	hourlyPrompt40: z.string().optional(),
	hourlyPrompt50: z.string().optional(),
	hourlyPrompt55: z.string().optional(),
	newsPrompt: z.string().optional(),
	weatherPrompt: z.string().optional(),
	trafficPrompt: z.string().optional(),
})

interface StationFormProps {
	initialData?: Station
	locations: {
		id: number
		code: string
		city: string
		country: string
	}[]
	onSubmit: (data: Partial<Station>) => void
	inModal: boolean
}

export default function StationForm({ initialData, locations, onSubmit, inModal = false }: StationFormProps) {
	const [activeTab, setActiveTab] = useState('general')
	const [prompts, setPrompts] = useState([])
	const [loading, setLoading] = useState(true)
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData?.name || '',
			stationId: Number(initialData?.stationId) || '',
			locationId: Number(initialData?.locationId) || '',
			website: initialData?.website || '',
			status: (initialData?.status as 'active' | 'inactive') || 'active',
			omniplayerUrl: initialData?.omniplayerUrl || '',
			clientId: Number(initialData?.clientId) || '',
			clientSecret: initialData?.clientSecret || '',
			username: initialData?.username || '',
			password: initialData?.password || '',
			systemPrompt: initialData?.systemPrompt || '',
			hourlyPrompt0: initialData?.hourlyPrompt0 || '',
			hourlyPrompt10: initialData?.hourlyPrompt10 || '',
			hourlyPrompt20: initialData?.hourlyPrompt20 || '',
			hourlyPrompt30: initialData?.hourlyPrompt30 || '',
			hourlyPrompt40: initialData?.hourlyPrompt40 || '',
			hourlyPrompt50: initialData?.hourlyPrompt50 || '',
			hourlyPrompt55: initialData?.hourlyPrompt55 || '',
			newsPrompt: initialData?.newsPrompt || '',
			weatherPrompt: initialData?.weatherPrompt || '',
			trafficPrompt: initialData?.trafficPrompt || '',
		},
	})

	// const {
	// 	data: promptsData,
	// 	isLoading: isLoadingPrompts,
	// 	error: promptsError,
	// } = useQuery({
	// 	queryKey: ['prompts'],
	// 	queryFn: () => axios.get('/api/prompts').then(res => res.data),
	// 	enabled: !!initialData,
	// })

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(data => {
					onSubmit({
						...data,
						stationId: Number(data.stationId),
						locationId: Number(data.locationId),
						clientId: Number(data.clientId),
					})
				})}
				className='space-y-6 py-5 max-h-[60vh] overflow-y-auto'>
				<Tabs defaultValue='general' value={activeTab} onValueChange={setActiveTab} className='w-full'>
					<TabsList className='grid grid-cols-2 w-full'>
						<TabsTrigger value='general'>General</TabsTrigger>
						<TabsTrigger value='prompts'>Prompts</TabsTrigger>
					</TabsList>

					<TabsContent value='general' className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
						<div className='gap-6 grid'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Name</FormLabel>
										<FormControl>
											<Input placeholder='Station Name' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='stationId'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Station ID</FormLabel>
										<FormControl>
											<Input placeholder='Station ID' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='locationId'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Location</FormLabel>
										<Select
											onValueChange={(value: string) => field.onChange(Number(value))}
											defaultValue={field.value.toString()}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select a location' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{locations?.map(location => (
													<SelectItem key={location.id} value={location.id.toString()}>
														{location.code} - {location.city}, {location.country}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
								name='status'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Status</FormLabel>
										<Select
											onValueChange={(value: string) => field.onChange(value)}
											defaultValue={typeof field.value === 'string' ? field.value : undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select status' />
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
								name='omniplayerUrl'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Omniplayer URL</FormLabel>
										<FormControl>
											<Input type='url' placeholder='Omniplayer URL' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='clientId'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Client ID</FormLabel>
										<FormControl>
											<Input placeholder='Client ID' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='clientSecret'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Client Secret</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Client Secret' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Username</FormLabel>
										<FormControl>
											<Input placeholder='Username' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-gray-200'>Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Password' {...field} />
										</FormControl>
										<FormMessage className='text-red-500' />
									</FormItem>
								)}
							/>
						</div>
					</TabsContent>

					<TabsContent value='prompts' className='space-y-6 bg-[#1a1a1a] p-6 border border-gray-700 rounded-lg'>
						<div className='space-y-8'>
							{/* System Prompt */}
							<div className='space-y-4'>
								<h3 className='font-medium text-gray-200 text-lg'>System Prompt</h3>
								<FormField
									control={form.control}
									name='systemPrompt'
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input placeholder='Enter system prompt' className='h-24' {...field} />
											</FormControl>
											<FormMessage className='text-red-500' />
										</FormItem>
									)}
								/>
							</div>

							{/* Hourly Prompts */}
							<div className='space-y-4'>
								<h3 className='font-medium text-gray-200 text-lg'>Hourly Prompts</h3>
								<div className='gap-4 grid'>
									{[0, 10, 20, 30, 40, 50, 55].map(minute => (
										<FormField
											key={minute}
											control={form.control}
											name={`hourlyPrompt${minute}` as keyof typeof formSchema._type}
											render={({ field }) => (
												<FormItem>
													<FormLabel className='text-gray-200'>
														Prompt HH:{minute.toString().padStart(2, '0')}
													</FormLabel>
													<FormControl>
														<Input
															placeholder={`Enter prompt for XX:${minute.toString().padStart(2, '0')}`}
															{...field}
														/>
													</FormControl>
													<FormMessage className='text-red-500' />
												</FormItem>
											)}
										/>
									))}
								</div>
							</div>

							{/* Special Prompts */}
							<div className='space-y-4'>
								<h3 className='font-medium text-gray-200 text-lg'>Special Prompts</h3>
								<div className='gap-4 grid'>
									<FormField
										control={form.control}
										name='newsPrompt'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-gray-200'>News Prompt</FormLabel>
												<FormControl>
													<Input placeholder='Enter news prompt' {...field} />
												</FormControl>
												<FormMessage className='text-red-500' />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='weatherPrompt'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-gray-200'>Weather Prompt</FormLabel>
												<FormControl>
													<Input placeholder='Enter weather prompt' {...field} />
												</FormControl>
												<FormMessage className='text-red-500' />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name='trafficPrompt'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-gray-200'>Traffic Prompt</FormLabel>
												<FormControl>
													<Input placeholder='Enter traffic prompt' {...field} />
												</FormControl>
												<FormMessage className='text-red-500' />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>

				<div className='flex justify-end space-x-4 pt-6 border-gray-700 border-t'>
					{inModal ? (
						<>
							<DialogClose asChild>
								<Button type='button' variant='outline'>
									Cancel
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button className={`bg-red-700`} variant={'destructive'} type='submit'>
									{initialData ? 'Update Station' : 'Add Station'}
								</Button>
							</DialogClose>
						</>
					) : (
						<>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
							<Button className={`bg-red-700`} variant={'destructive'} type='submit'>
								{initialData ? 'Update Station' : 'Add Station'}
							</Button>
						</>
					)}
				</div>
			</form>
		</Form>
	)
}
