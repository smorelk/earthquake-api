# Earthquake API

A Ruby-on-Rails API that provide data about Earthquakes events in the past 30 days and also a React web app to display points in a map to show where the earthquake happen, as well as other relevant information.

## Dependencies

First of all, install the ruby gems needed by running the following command:

```bash
bundle install
```

Next, install either Node.js or Bun to run the front-end code, then run the following:
```bash
cd front-end/earthquake-view
# run either npm install or bun install in this step
```

## Build and Run
First run database migrations to properly set the schema
```bash
rails db:migrate
```
Populate database with custom task. For details see lib/tasks/earthquake_db.rake 
```bash
rails earthquake_db:populate
```
After that, run the API server
```bash
rails server
```

To run the Web App, run:
```
bun start # or npm run start