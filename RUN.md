# 🚀 How to Run - Quick Reference

## Quick Start (2 Steps)

### Step 1: Start Backend (Terminal 1)

```bash
cd python_service
./run_server.sh
```

**OR manually:**
```bash
cd python_service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.seed_data
uvicorn app.main:app --reload
```

✅ Backend running at http://localhost:8000

### Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
# Create .env.local file (see below)
npm run dev
```

✅ Frontend running at http://localhost:3000

## Create .env.local File

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Get Google OAuth credentials:**
1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 Client ID
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to .env.local

## Access the App

🌐 Open http://localhost:3000 in your browser

## Verify It's Working

✅ Backend: http://localhost:8000 → Shows API message
✅ Frontend: http://localhost:3000 → Shows landing page
✅ API Docs: http://localhost:8000/docs → Shows API documentation

## Troubleshooting

**Backend not starting?**
- Check Python version: `python3 --version` (needs 3.11+)
- Check if port 8000 is free: `lsof -i :8000`

**Frontend not starting?**
- Check Node version: `node --version` (needs 18+)
- Check if port 3000 is free: `lsof -i :3000`
- Make sure .env.local exists

**Can't sign in?**
- Check Google OAuth credentials in .env.local
- Verify redirect URI matches exactly

## Need More Help?

See **HOW_TO_RUN.md** for detailed instructions.

