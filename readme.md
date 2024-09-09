# Gov UK Hackathon

## Getting started

1. Clone this repository to your local machine
2. Install dependencies by running `npm install`
3. Start the local dev server by running `npm run start`

## Formatting

Use Prettier to format your code by running `npx prettier . --write` in the root directory.

## Database

This app uses stores data locally using a SQLite database. This initialises on startup and will persist data during server restarts. To clear the database, simply delete `database.sqlite` from the root directory and a new instance will be created on server restart.
