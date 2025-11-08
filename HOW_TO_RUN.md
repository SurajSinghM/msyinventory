# How to Run Mai Shan Yun Inventory Intelligence Dashboard

## Prerequisites

Before starting, make sure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Python 3.11+** installed ([Download](https://www.python.org/downloads/))
- **npm** (comes with Node.js)
- **pip** (comes with Python)

## Step 1: Backend Setup

### 1.1 Navigate to Python Service Directory
```bash
cd python_service
```

### 1.2 Create Virtual Environment
```bash
python3 -m venv venv
```

### 1.3 Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

### 1.4 Install Dependencies
```bash
pip install -r requirements.txt
```

This may take a few minutes as it installs PyTorch and other dependencies.

### 1.5 Create Data Directories
```bash
mkdir -p data/processed data/models
```

### 1.6 Seed Database with Sample Data
```bash
python -m app.seed_data
```

This will populate the database with sample ingredients, purchases, shipments, and sales data.

### 1.7 Start the Backend Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
```

**Keep this terminal window open!** The backend server needs to keep running.

### 1.8 Verify Backend is Running
Open your browser and go to:
- http://localhost:8000 - Should show `{"message":"Mai Shan Yun Inventory Intelligence API"}`
- http://localhost:8000/docs - Should show the FastAPI documentation
- http://localhost:8000/inventory/levels - Should return inventory data (JSON)

## Step 2: Frontend Setup

### 2.1 Open a New Terminal Window
Keep the backend running in the first terminal, and open a new terminal window.

### 2.2 Navigate to Frontend Directory
```bash
cd frontend
```

### 2.3 Install Dependencies
```bash
npm install
```

This may take a few minutes.

### 2.4 Create Environment File
Create a file named `.env.local` in the `frontend` directory:

```bash
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EOF
```

**Or manually create `.env.local` with this content:**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 2.5 Set Up Google OAuth (Required for Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set Application type to **Web application**
6. Add **Authorized redirect URI**: `http://localhost:3000/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret**
8. Update `.env.local` with these values

**For testing without Google OAuth**, you can use placeholder values, but sign-in won't work.

### 2.6 Start the Frontend Server
```bash
npm run dev
```

You should see output like:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Ready in 2.3s
```

### 2.7 Access the Dashboard
Open your browser and go to:
- http://localhost:3000 - Should show the landing page

## Step 3: Using the Dashboard

### 3.1 Sign In
1. Click "Sign in with Google" on the landing page
2. Authorize the application
3. You'll be redirected to the dashboard

### 3.2 Explore Features
- **Dashboard**: View inventory levels, forecasts, and KPIs
- **Data Upload**: Upload CSV/XLSX files with inventory data
- **Settings**: Retrain the ML model or view account settings

## Quick Start Script (Alternative)

If you prefer a one-command setup, you can use the provided script:

### Backend:
```bash
cd python_service
./run_server.sh
```

This script will:
- Create virtual environment
- Install dependencies
- Seed the database
- Start the server

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Docker Setup (Alternative)

If you have Docker installed, you can run everything with Docker:

```bash
cd infra
docker-compose up --build
```

This will start:
- Backend on http://localhost:8000
- Frontend on http://localhost:3000
- Nginx on http://localhost

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

**Python version error:**
```bash
# Check Python version
python3 --version
# Should be 3.11 or higher
```

**Module not found errors:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
# Reinstall dependencies
pip install -r requirements.txt
```

**Database errors:**
```bash
# Delete existing database and reseed
rm data/msy_inventory.db
python -m app.seed_data
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Find process using port 3000
lsof -i :3000
# Kill the process
kill -9 <PID>
```

**Node version error:**
```bash
# Check Node version
node --version
# Should be 18 or higher
```

**Module not found errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Environment variables not loading:**
- Make sure `.env.local` is in the `frontend` directory
- Restart the dev server after changing `.env.local`
- Check that variable names start with `NEXT_PUBLIC_` for client-side variables

### Authentication Issues

**Google Sign-in not working:**
- Verify Google OAuth credentials in `.env.local`
- Check that redirect URI matches exactly: `http://localhost:3000/api/auth/callback/google`
- Make sure `NEXTAUTH_SECRET` is set
- Check browser console for errors

**For testing without authentication:**
- You can modify the code to bypass authentication (not recommended for production)
- Or use placeholder OAuth credentials (sign-in will fail but you can test other features)

### API Connection Issues

**Frontend can't connect to backend:**
- Verify backend is running on http://localhost:8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend (should allow http://localhost:3000)
- Check browser console for CORS errors

**API returns 404:**
- Verify backend endpoints are working: http://localhost:8000/docs
- Check API URL in frontend code
- Verify endpoint paths match

## Verifying Everything Works

### Backend Checks:
1. ✅ http://localhost:8000 returns API message
2. ✅ http://localhost:8000/docs shows API documentation
3. ✅ http://localhost:8000/inventory/levels returns JSON data
4. ✅ http://localhost:8000/shipments returns JSON data

### Frontend Checks:
1. ✅ http://localhost:3000 loads landing page
2. ✅ Theme toggle works (light/dark)
3. ✅ Language toggle works (English/中文)
4. ✅ Google Sign-in button appears
5. ✅ After sign-in, dashboard loads
6. ✅ Inventory data displays
7. ✅ Forecasts appear
8. ✅ Charts render

## Next Steps

Once everything is running:
1. **Upload Data**: Go to `/data` page and upload CSV/XLSX files
2. **Train Model**: Go to `/settings` and click "Retrain Model"
3. **View Forecasts**: Check forecast cards on the dashboard
4. **Explore Features**: Try all the dashboard features

## Need Help?

- Check the **README.md** for detailed documentation
- Review **QUICKSTART.md** for setup instructions
- Check **TROUBLESHOOTING.md** for common issues
- Review error messages in terminal and browser console

## Summary

**To run the project:**

1. **Terminal 1 (Backend):**
   ```bash
   cd python_service
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python -m app.seed_data
   uvicorn app.main:app --reload
   ```

2. **Terminal 2 (Frontend):**
   ```bash
   cd frontend
   npm install
   # Create .env.local with Google OAuth credentials
   npm run dev
   ```

3. **Browser:**
   - Open http://localhost:3000
   - Sign in with Google
   - Explore the dashboard!

That's it! 🎉

