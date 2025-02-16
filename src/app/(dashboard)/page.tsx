import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const weeklyData = [
	{ name: 'Mon', total: 240 },
	{ name: 'Tue', total: 280 },
	{ name: 'Wed', total: 300 },
	{ name: 'Thu', total: 260 },
	{ name: 'Fri', total: 270 },
	{ name: 'Sat', total: 250 },
	{ name: 'Sun', total: 220 },
]

export default function DashboardPage() {
	return (
		<div className='space-y-6 p-6 pb-16 container'>
			<div className='flex flex-col gap-4 md:gap-8'>
				<h1 className='font-heading text-3xl md:text-4xl'>Dashboard</h1>
				<div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
					<Card>
						<CardHeader>
							<CardTitle>Weekly Broadcasts</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='relative w-full h-[200px]'>
								<ResponsiveContainer width='100%' height='100%'>
									<BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
										<XAxis
											dataKey='name'
											stroke='#888888'
											fontSize={12}
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											interval='preserveStartEnd'
											scale='band'
											padding={{ left: 0, right: 0 }}
										/>
										<YAxis
											stroke='#888888'
											fontSize={12}
											tickLine={false}
											axisLine={false}
											tickFormatter={value => `${value}`}
											width={40}
											tickMargin={8}
											domain={[0, 'auto']}
											scale='linear'
											padding={{ top: 0, bottom: 0 }}
										/>
										<Bar
											dataKey='total'
											fill='hsl(var(--muted-foreground))'
											radius={[4, 4, 0, 0]}
											barSize={30}
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
