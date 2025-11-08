# Mai Shan Yun Inventory Intelligence - Frontend

Next.js frontend application with TypeScript, Tailwind CSS, and NextAuth.

## Setup

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Project Structure

```
frontend/
├── components/          # React components
│   ├── Header.tsx
│   ├── InventoryTable.tsx
│   ├── ForecastCard.tsx
│   ├── ShipmentTracker.tsx
│   ├── CostOptimization.tsx
│   ├── AlertsPanel.tsx
│   ├── FlameLogo.tsx
│   ├── ThemeProvider.tsx
│   └── LanguageProvider.tsx
├── pages/               # Next.js pages
│   ├── index.tsx        # Landing page
│   ├── dashboard.tsx    # Dashboard
│   ├── data.tsx         # Data upload
│   ├── settings.tsx     # Settings
│   └── api/             # API routes
├── styles/              # Global styles
│   └── globals.css
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Features

- **Authentication**: Google Sign-in with NextAuth
- **Theme**: Light/Dark mode with persistence
- **Language**: English/中文 bilingual support
- **Dashboard**: Inventory overview, forecasts, shipments, costs
- **Visualizations**: Charts using Recharts
- **Animations**: Flame logo with Framer Motion

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Vercel

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker

```bash
# Build image
docker build -t msy-inventory-frontend .

# Run container
docker run -p 3000:3000 msy-inventory-frontend
```

## Styling

Uses Tailwind CSS with custom color palette:
- Primary Red: #E10600
- Gold: #FFC72C
- Jade: #00A878
- Navy: #0B2747
- Rice: #FFF8F0

## Fonts

- Inter (English)
- Noto Sans SC (Chinese)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

