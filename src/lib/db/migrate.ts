// import { sql } from '@vercel/postgres'
// import { config } from 'dotenv'
// import { resolve } from 'path'

// // Load both .env and .env.local files
// config({ path: resolve(__dirname, '../../../.env') })
// config({ path: resolve(__dirname, '../../../.env.local') })

// // Use environment variables from .env.local if available
// const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL

// async function runMigration() {
// 	if (!dbUrl) {
// 		throw new Error('Database URL environment variable is required')
// 	}
// 	try {
// 		console.log('Starting migration...')

// 		// Drop existing tables if they exist
// 		console.log('Dropping existing tables...')
// 		await sql.query(`
//       DROP TABLE IF EXISTS client_stations CASCADE;
//       DROP TABLE IF EXISTS stations CASCADE;
//       DROP TABLE IF EXISTS clients CASCADE;
//       DROP TABLE IF EXISTS locations CASCADE;
//       DROP TABLE IF EXISTS voices CASCADE;
//       DROP TABLE IF EXISTS settings CASCADE;
//     `)

// 		// Create locations table
// 		console.log('Creating locations table...')
// 		await sql.query(`
//       CREATE TABLE locations (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         country VARCHAR(2) NOT NULL,
//         city VARCHAR(255) NOT NULL,
//         timezone VARCHAR(100) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `)

// 		// Create clients table
// 		console.log('Creating clients table...')
// 		await sql.query(`
//       CREATE TABLE clients (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         company VARCHAR(255) NOT NULL,
//         website VARCHAR(255),
//         logo VARCHAR(255),
//         status VARCHAR(50) NOT NULL DEFAULT 'active',
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `)

// 		// Create stations table
// 		console.log('Creating stations table...')
// 		await sql.query(`
//       CREATE TABLE stations (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         station_id VARCHAR(50) NOT NULL,
//         location_id INTEGER REFERENCES locations(id),
//         omniplayer_url VARCHAR(255) NOT NULL,
//         client_id VARCHAR(255) NOT NULL,
//         client_secret VARCHAR(255) NOT NULL,
//         username VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         language VARCHAR(50) NOT NULL,
//         website VARCHAR(255),
//         logo VARCHAR(255),
//         status VARCHAR(50) NOT NULL,
//         system_prompt TEXT,
//         prompts JSONB,
//         news_prompts JSONB,
//         format JSONB,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `)

// 		// Create client_stations junction table
// 		console.log('Creating client_stations table...')
// 		await sql.query(`
//       CREATE TABLE client_stations (
//         client_id INTEGER REFERENCES clients(id),
//         station_id INTEGER REFERENCES stations(id),
//         PRIMARY KEY (client_id, station_id)
//       )
//     `)

// 		// Create voices table
// 		console.log('Creating voices table...')
// 		await sql.query(`
//       CREATE TABLE voices (
//         id SERIAL PRIMARY KEY,
//         voice_id VARCHAR(255) NOT NULL,
//         name VARCHAR(255) NOT NULL,
//         gender VARCHAR(50) NOT NULL,
//         language VARCHAR(50) NOT NULL,
//         accent VARCHAR(100),
//         age INTEGER,
//         country VARCHAR(2) NOT NULL,
//         category VARCHAR(50) NOT NULL,
//         status VARCHAR(50) NOT NULL DEFAULT 'active',
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `)

// 		// Create settings table
// 		console.log('Creating settings table...')
// 		await sql.query(`
//       CREATE TABLE settings (
//         id VARCHAR(255) PRIMARY KEY,
//         api_key VARCHAR(255),
//         webhook_url VARCHAR(255),
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//       )
//     `)

// 		// Create indexes
// 		console.log('Creating indexes...')
// 		await sql.query(`
//       CREATE INDEX idx_locations_country ON locations(country);
//       CREATE INDEX idx_locations_city ON locations(city);
//       CREATE INDEX idx_stations_location_id ON stations(location_id);
//       CREATE INDEX idx_voices_category ON voices(category);
//       CREATE INDEX idx_voices_language ON voices(language);
//       CREATE INDEX idx_clients_status ON clients(status);
//     `)

// 		console.log('Migration completed successfully')
// 	} catch (error) {
// 		console.error('Migration failed:', error)
// 		process.exit(1)
// 	}
// }

// runMigration()
