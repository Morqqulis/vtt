'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export default function Header() {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			})

			if (response.ok) {
				router.push('/login')
			}
		} catch (error) {
			console.error('Logout failed:', error)
		}
	}

	return (
		<header className='top-0 z-50 sticky bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 w-full'>
			<div className='flex items-center h-14 container'>
				<div className='flex mr-4'>
					<Link className='flex items-center space-x-2 mr-6' href='/'></Link>
				</div>
				<div className='flex flex-1 justify-between md:justify-end items-center space-x-2'>
					<div className='flex-1 md:flex-none w-full md:w-auto'></div>

					<Popover>
						<PopoverTrigger asChild>
							<ShimmerButton className={`flex items-center gap-2`} variant={'outline'} size={'sm'}>
								<UserCircleIcon className='w-5 h-5' />
								<span>Profile</span>
							</ShimmerButton>
						</PopoverTrigger>
						<PopoverContent className={`w-fit p-0`}>
							<Button
								onClick={handleLogout}
								className={` block w-full px-8 py-2 text-left text-sm text-foreground`}
								variant={'ghost'}
								size={'sm'}>
								Sign out
							</Button>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	)
}
