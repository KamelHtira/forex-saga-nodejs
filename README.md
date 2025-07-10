# Kamel Forex Saga Node.js Server

## Project Structure

- `index.js` — Main entry point, sets up Express, rate limiter, and routes
- `routes/` — Route definitions (e.g., `strategy.js`)
- `controllers/` — Controller logic for handling requests
- `services/` — Service layer for database operations

## Setup

1. Install dependencies:
   ```sh
   pnpm install
   ```
2. Start the server:
   ```sh
   pnpm start
   ```

## API Endpoints

- `GET    /api/strategy` — List all strategies
- `GET    /api/strategy/:id` — Get a strategy by ID
- `POST   /api/strategy` — Create a new strategy (`{ name, description }`)
- `PUT    /api/strategy/:id` — Update a strategy (`{ name, description }`)
- `DELETE /api/strategy/:id` — Delete a strategy

## Notes

- Uses [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for basic rate limiting.
