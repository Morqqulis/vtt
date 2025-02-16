// import { sql } from '@vercel/postgres';
// import { drizzle } from 'drizzle-orm/vercel-postgres';
// import { 
//   pgTable, 
//   serial, 
//   text, 
//   timestamp, 
//   boolean,
//   json,
//   varchar,
//   jsonb,
//   integer,
//   primaryKey
// } from 'drizzle-orm/pg-core';

// export const locations = pgTable('locations', {
//   id: serial('id').primaryKey(),
//   code: varchar('code', { length: 2 }).notNull().unique(),
//   city: varchar('city', { length: 100 }).notNull(),
//   country: varchar('country', { length: 100 }).notNull(),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

// export const stations = pgTable('stations', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 100 }).notNull(),
//   stationId: varchar('station_id', { length: 100 }).notNull().unique(),
//   locationId: serial('location_id').references(() => locations.id),
//   website: varchar('website', { length: 255 }),
//   status: varchar('status', { length: 20 }).default('active'),
//   omniplayerUrl: varchar('omniplayer_url', { length: 255 }),
//   clientId: varchar('client_id', { length: 100 }).notNull(),
//   clientSecret: varchar('client_secret', { length: 100 }).notNull(),
//   username: varchar('username', { length: 100 }).notNull(),
//   password: varchar('password', { length: 100 }).notNull(),
//   systemPrompt: text('system_prompt'),
//   hourlyPrompt0: text('hourly_prompt_0'),
//   hourlyPrompt10: text('hourly_prompt_10'),
//   hourlyPrompt20: text('hourly_prompt_20'),
//   hourlyPrompt30: text('hourly_prompt_30'),
//   hourlyPrompt40: text('hourly_prompt_40'),
//   hourlyPrompt50: text('hourly_prompt_50'),
//   hourlyPrompt55: text('hourly_prompt_55'),
//   newsPrompt: text('news_prompt'),
//   weatherPrompt: text('weather_prompt'),
//   trafficPrompt: text('traffic_prompt'),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

// export const clients = pgTable('clients', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull(),
//   company: varchar('company', { length: 255 }).notNull(),
//   website: varchar('website', { length: 255 }),
//   logo: varchar('logo', { length: 255 }),
//   status: varchar('status', { length: 50 }).notNull().default('active'),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

// export const clientStations = pgTable('client_stations', {
//   clientId: integer('client_id').references(() => clients.id),
//   stationId: integer('station_id').references(() => stations.id),
// }, (table) => ({
//   pk: primaryKey(table.clientId, table.stationId),
// }));

// export const settings = pgTable('settings', {
//   id: varchar('id', { length: 255 }).primaryKey(),
//   apiKey: varchar('api_key', { length: 255 }),
//   webhookUrl: varchar('webhook_url', { length: 255 }),
//   createdAt: timestamp('created_at').defaultNow(),
//   updatedAt: timestamp('updated_at').defaultNow(),
// });

// export const voices = pgTable('voices', {
//   id: serial('id').primaryKey(),
//   voiceId: varchar('voice_id', { length: 255 }).notNull(),
//   name: varchar('name', { length: 255 }).notNull(),
//   gender: varchar('gender', { length: 50 }).notNull(),
//   language: varchar('language', { length: 50 }).notNull(),
//   accent: varchar('accent', { length: 100 }),
//   age: integer('age'),
//   country: varchar('country', { length: 2 }).notNull(),
//   category: varchar('category', { length: 50 }).notNull(),
//   status: varchar('status', { length: 50 }).notNull().default('active'),
//   createdAt: timestamp('created_at').defaultNow(),
// });

// // ... similar tables for voices and clients 