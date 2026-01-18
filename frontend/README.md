# Contract Management Frontend

Modern React TypeScript frontend for the Contract Management Platform with Vite and Tailwind CSS.

## Features

- Blueprint management
- Contract creation and lifecycle management
- Real-time status updates
- Responsive design with Tailwind CSS
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create .env file:
   ```bash
   cp .env.example .env
   ```

3. Update .env with your API configuration:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Running

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Lucide React (icons)

## Project Structure

```
src/
├── components/         # React components
├── services/          # API services
├── types/            # TypeScript types
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## License

MIT
