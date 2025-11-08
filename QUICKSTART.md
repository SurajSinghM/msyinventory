# Quick Start Guide

Get the Mai Shan Yun Inventory Intelligence Dashboard running in 5 minutes!

## Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- Google OAuth credentials (for authentication)

## Step 1: Backend Setup

```bash
cd python_service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create data directories
mkdir -p data/processed data/models

# Seed database with sample data
python -m app.seed_data

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or use the provided script:
```bash
./run_server.sh
```

The backend will be available at `http://localhost:8000`

## Step 2: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EOF

# Run the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Step 3: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set Application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Copy the Client ID and Client Secret
8. Update `.env.local` with these credentials

## Step 4: Access the Dashboard

1. Open `http://localhost:3000` in your browser
2. Click "Sign in with Google"
3. Authorize the application
4. You'll be redirected to the dashboard

## Troubleshooting

### Backend not starting
- Check if port 8000 is available
- Verify Python version (3.11+)
- Check if all dependencies are installed

### Frontend not starting
- Check if port 3000 is available
- Verify Node.js version (18+)
- Check if all dependencies are installed
- Verify `.env.local` file exists and has correct values

### Authentication not working
- Verify Google OAuth credentials in `.env.local`
- Check if redirect URI matches exactly
- Verify NEXTAUTH_SECRET is set

### No data showing
- Run the seed script: `python -m app.seed_data`
- Check if backend is running
- Verify API URL in `.env.local`

## Next Steps

- Upload your own data via the `/data` page
- Train the forecasting model via `/settings`
- Explore the dashboard features
- Check out the README for more details

## Docker Quick Start

If you prefer Docker:

```bash
cd infra
docker-compose up --build
```

This will start all services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Nginx: http://localhost

## Need Help?

- Check the README.md for detailed documentation
- Review the demo_script.md for usage examples
- Check the CHECKLIST.md for feature list

