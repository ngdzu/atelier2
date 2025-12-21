<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LuxeNail Salon Website - Client Application

This is the frontend client application for the LuxeNail salon website, built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 20+ (for local development)
- Docker and Docker Compose (for containerized development/deployment)

## Run Locally (Without Docker)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000` (as configured in `vite.config.ts`)

## Run with Docker

### Development Environment

Start the development environment with hot reload:

```bash
# From project root
docker-compose up client
```

The client will be available at `http://localhost:5173`

### Production Environment

Build and run the production environment:

```bash
# From project root
docker-compose -f docker-compose.prod.yml build client
docker-compose -f docker-compose.prod.yml up client
```

The client will be available at `http://localhost:80`

For detailed Docker instructions, see [DOCKER.md](../DOCKER.md) in the project root.

## Environment Variables

Create a `.env.local` file in the `client/` directory:

```env
GEMINI_API_KEY=your_api_key_here
VITE_HOST=0.0.0.0
VITE_PORT=5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
client/
├── components/     # React components
├── services/       # Service layer (dataService, geminiService)
├── types.ts       # TypeScript type definitions
├── constants.tsx  # Application constants
├── App.tsx        # Root component
└── index.tsx      # Entry point
```

## Testing

Run tests:

```bash
npm run test
```

For detailed testing documentation, see [TESTING.md](TESTING.md).

## Additional Resources

- [Docker Setup Guide](../DOCKER.md)
- [Testing Guide](TESTING.md)
- [Project Documentation](../README.md)
