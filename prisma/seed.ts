import prisma from '@/lib/db/prisma'

async function main() {
	try {
		// Create initial locations
		await prisma.location.createMany({
			data: [
				{ code: 'NL', city: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
				{ code: 'BE', city: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels' },
				{ code: 'DE', city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
				{ code: 'FR', city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
				{ code: 'UK', city: 'London', country: 'United Kingdom', timezone: 'Europe/London' },
				{ code: 'ES', city: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid' },
				{ code: 'IT', city: 'Rome', country: 'Italy', timezone: 'Europe/Rome' },
				{ code: 'PT', city: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon' },
				{ code: 'AT', city: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna' },
				{ code: 'CH', city: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich' },
				{ code: 'SE', city: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm' },
				{ code: 'NO', city: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo' },
				{ code: 'DK', city: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen' },
				{ code: 'FI', city: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki' },
				{ code: 'PL', city: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw' },
			],
			skipDuplicates: true,
		})

		console.log('Seed data inserted successfully')
	} catch (error) {
		console.error('Error seeding data:', error)
		process.exit(1)
	}
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
