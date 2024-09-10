# Gov UK Hackathon

## Getting started

1. Clone this repository to your local machine
2. Install dependencies by running `npm install`
3. Start the local dev server by running `npm run start`

## Formatting

Use Prettier to format your code by running `npx prettier . --write` in the root directory.

## Database

This app uses stores data locally using a SQLite database. This initialises on startup and will persist data during server restarts. To clear the database, simply delete `database.sqlite` from the root directory and a new instance will be created on server restart.


## Recomended Extentions

1. Nunjucks - https://marketplace.visualstudio.com/items?itemName=ronnidc.nunjucks
2. SQLite Viewer - https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer

## How to create a new data model

1. Review the journey you are working on and make a list of fields you want to store data.
2. Open 
```
/models/models.js
```
and extend the class with your model
3. Add required data types for your flow
4. Export the model
5. Import it into the router for your journey