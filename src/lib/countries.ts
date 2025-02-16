// Using ISO 3166-1 alpha-2 codes
export interface Country {
	code: string // ISO 3166-1 alpha-2 (2 letters)
	name: string
	cities: City[]
}

export interface City {
	name: string
	code: string // ISO 3166-1 alpha-2 (2 letters uppercase)
	timezone: string
}

export const COUNTRIES: Country[] = [
	{
		code: 'AT',
		name: 'Austria',
		cities: [
			{ name: 'Vienna', code: 'AT', timezone: 'Europe/Vienna' },
			{ name: 'Salzburg', code: 'AT', timezone: 'Europe/Vienna' },
			{ name: 'Graz', code: 'AT', timezone: 'Europe/Vienna' },
			{ name: 'Innsbruck', code: 'AT', timezone: 'Europe/Vienna' },
			{ name: 'Linz', code: 'AT', timezone: 'Europe/Vienna' },
		],
	},
	{
		code: 'BE',
		name: 'Belgium',
		cities: [
			{ name: 'Brussels', code: 'BE', timezone: 'Europe/Brussels' },
			{ name: 'Antwerp', code: 'BE', timezone: 'Europe/Brussels' },
			{ name: 'Liège', code: 'BE', timezone: 'Europe/Brussels' },
			{ name: 'Ghent', code: 'BE', timezone: 'Europe/Brussels' },
			{ name: 'Charleroi', code: 'BE', timezone: 'Europe/Brussels' },
		],
	},
	{
		code: 'CA',
		name: 'Canada',
		cities: [
			{ name: 'Toronto', code: 'CA', timezone: 'America/Toronto' },
			{ name: 'Montreal', code: 'CA', timezone: 'America/Montreal' },
			{ name: 'Vancouver', code: 'CA', timezone: 'America/Vancouver' },
			{ name: 'Calgary', code: 'CA', timezone: 'America/Edmonton' },
			{ name: 'Ottawa', code: 'CA', timezone: 'America/Toronto' },
		],
	},
	{
		code: 'DK',
		name: 'Denmark',
		cities: [
			{ name: 'Copenhagen', code: 'DK', timezone: 'Europe/Copenhagen' },
			{ name: 'Aarhus', code: 'DK', timezone: 'Europe/Copenhagen' },
			{ name: 'Billund', code: 'DK', timezone: 'Europe/Copenhagen' },
			{ name: 'Aalborg', code: 'DK', timezone: 'Europe/Copenhagen' },
			{ name: 'Odense', code: 'DK', timezone: 'Europe/Copenhagen' },
		],
	},
	{
		code: 'FI',
		name: 'Finland',
		cities: [
			{ name: 'Helsinki', code: 'FI', timezone: 'Europe/Helsinki' },
			{ name: 'Tampere', code: 'FI', timezone: 'Europe/Helsinki' },
			{ name: 'Oulu', code: 'FI', timezone: 'Europe/Helsinki' },
			{ name: 'Turku', code: 'FI', timezone: 'Europe/Helsinki' },
			{ name: 'Vaasa', code: 'FI', timezone: 'Europe/Helsinki' },
		],
	},
	{
		code: 'FR',
		name: 'France',
		cities: [
			{ name: 'Paris', code: 'FR', timezone: 'Europe/Paris' },
			{ name: 'Lyon', code: 'FR', timezone: 'Europe/Paris' },
			{ name: 'Marseille', code: 'FR', timezone: 'Europe/Paris' },
			{ name: 'Toulouse', code: 'FR', timezone: 'Europe/Paris' },
			{ name: 'Nice', code: 'FR', timezone: 'Europe/Paris' },
		],
	},
	{
		code: 'DE',
		name: 'Germany',
		cities: [
			{ name: 'Berlin', code: 'DE', timezone: 'Europe/Berlin' },
			{ name: 'Munich', code: 'DE', timezone: 'Europe/Berlin' },
			{ name: 'Frankfurt', code: 'DE', timezone: 'Europe/Berlin' },
			{ name: 'Hamburg', code: 'DE', timezone: 'Europe/Berlin' },
			{ name: 'Düsseldorf', code: 'DE', timezone: 'Europe/Berlin' },
		],
	},
	{
		code: 'IE',
		name: 'Ireland',
		cities: [
			{ name: 'Dublin', code: 'IE', timezone: 'Europe/Dublin' },
			{ name: 'Cork', code: 'IE', timezone: 'Europe/Dublin' },
			{ name: 'Shannon', code: 'IE', timezone: 'Europe/Dublin' },
			{ name: 'Galway', code: 'IE', timezone: 'Europe/Dublin' },
			{ name: 'Kerry', code: 'IE', timezone: 'Europe/Dublin' },
		],
	},
	{
		code: 'IT',
		name: 'Italy',
		cities: [
			{ name: 'Rome', code: 'IT', timezone: 'Europe/Rome' },
			{ name: 'Milan', code: 'IT', timezone: 'Europe/Rome' },
			{ name: 'Venice', code: 'IT', timezone: 'Europe/Rome' },
			{ name: 'Florence', code: 'IT', timezone: 'Europe/Rome' },
			{ name: 'Naples', code: 'IT', timezone: 'Europe/Rome' },
		],
	},
	{
		code: 'NL',
		name: 'Netherlands',
		cities: [
			{ name: 'Amsterdam', code: 'NL', timezone: 'Europe/Amsterdam' },
			{ name: 'Rotterdam', code: 'NL', timezone: 'Europe/Amsterdam' },
			{ name: 'Eindhoven', code: 'NL', timezone: 'Europe/Amsterdam' },
			{ name: 'The Hague', code: 'NL', timezone: 'Europe/Amsterdam' },
			{ name: 'Groningen', code: 'NL', timezone: 'Europe/Amsterdam' },
		],
	},
	{
		code: 'NO',
		name: 'Norway',
		cities: [
			{ name: 'Oslo', code: 'NO', timezone: 'Europe/Oslo' },
			{ name: 'Bergen', code: 'NO', timezone: 'Europe/Oslo' },
			{ name: 'Trondheim', code: 'NO', timezone: 'Europe/Oslo' },
			{ name: 'Stavanger', code: 'NO', timezone: 'Europe/Oslo' },
			{ name: 'Tromsø', code: 'NO', timezone: 'Europe/Oslo' },
		],
	},
	{
		code: 'ES',
		name: 'Spain',
		cities: [
			{ name: 'Madrid', code: 'ES', timezone: 'Europe/Madrid' },
			{ name: 'Barcelona', code: 'ES', timezone: 'Europe/Madrid' },
			{ name: 'Valencia', code: 'ES', timezone: 'Europe/Madrid' },
			{ name: 'Seville', code: 'ES', timezone: 'Europe/Madrid' },
			{ name: 'Málaga', code: 'ES', timezone: 'Europe/Madrid' },
		],
	},
	{
		code: 'SE',
		name: 'Sweden',
		cities: [
			{ name: 'Stockholm', code: 'SE', timezone: 'Europe/Stockholm' },
			{ name: 'Gothenburg', code: 'SE', timezone: 'Europe/Stockholm' },
			{ name: 'Malmö', code: 'SE', timezone: 'Europe/Stockholm' },
			{ name: 'Uppsala', code: 'SE', timezone: 'Europe/Stockholm' },
			{ name: 'Västerås', code: 'SE', timezone: 'Europe/Stockholm' },
		],
	},
	{
		code: 'CH',
		name: 'Switzerland',
		cities: [
			{ name: 'Zurich', code: 'CH', timezone: 'Europe/Zurich' },
			{ name: 'Geneva', code: 'CH', timezone: 'Europe/Zurich' },
			{ name: 'Basel', code: 'CH', timezone: 'Europe/Zurich' },
			{ name: 'Bern', code: 'CH', timezone: 'Europe/Zurich' },
			{ name: 'Lausanne', code: 'CH', timezone: 'Europe/Zurich' },
		],
	},
	{
		code: 'GB',
		name: 'United Kingdom',
		cities: [
			{ name: 'London', code: 'GB', timezone: 'Europe/London' },
			{ name: 'Manchester', code: 'GB', timezone: 'Europe/London' },
			{ name: 'Birmingham', code: 'GB', timezone: 'Europe/London' },
			{ name: 'Edinburgh', code: 'GB', timezone: 'Europe/London' },
			{ name: 'Glasgow', code: 'GB', timezone: 'Europe/London' },
		],
	},
	{
		code: 'US',
		name: 'United States',
		cities: [
			{ name: 'New York', code: 'US', timezone: 'America/New_York' },
			{ name: 'Los Angeles', code: 'US', timezone: 'America/Los_Angeles' },
			{ name: 'Chicago', code: 'US', timezone: 'America/Chicago' },
			{ name: 'Houston', code: 'US', timezone: 'America/Chicago' },
			{ name: 'Miami', code: 'US', timezone: 'America/New_York' },
			{ name: 'San Francisco', code: 'US', timezone: 'America/Los_Angeles' },
			{ name: 'Dallas', code: 'US', timezone: 'America/Chicago' },
			{ name: 'Washington DC', code: 'US', timezone: 'America/New_York' },
			{ name: 'Boston', code: 'US', timezone: 'America/New_York' },
			{ name: 'Las Vegas', code: 'US', timezone: 'America/Los_Angeles' },
		],
	},
].sort((a, b) => a.name.localeCompare(b.name))
