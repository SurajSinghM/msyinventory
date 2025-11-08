# 🚀 Start Here - Mai Shan Yun Inventory Intelligence Dashboard

Welcome! This guide will help you get started with the Mai Shan Yun Inventory Intelligence Dashboard.

## 📋 Quick Overview

This is a full-stack inventory management dashboard with:
- **Frontend**: Next.js with TypeScript, Tailwind CSS, and NextAuth
- **Backend**: FastAPI with PyTorch ML model
- **Features**: Inventory tracking, demand forecasting, shipment tracking, cost optimization

## 🏃 Quick Start (5 minutes)

### Option 1: Local Development

1. **Backend Setup**
   ```bash
   cd python_service
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python -m app.seed_data
   uvicorn app.main:app --reload
   ```

2. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   # Create .env.local with your Google OAuth credentials
   npm run dev
   ```

3. **Access**: Open http://localhost:3000

### Option 2: Docker

```bash
cd infra
docker-compose up --build
```

Access: http://localhost:3000

## 📚 Documentation

- **README.md** - Full project documentation
- **QUICKSTART.md** - Detailed quick start guide
- **demo_script.md** - Demo scripts (2-min and 5-min versions)
- **CHECKLIST.md** - Project checklist
- **PROJECT_SUMMARY.md** - Technical summary

## 🔧 Setup Requirements

### Prerequisites
- Node.js 18+
- Python 3.11+
- Google OAuth credentials (for authentication)

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Backend (.env)**
```
DATABASE_URL=sqlite:///./data/msy_inventory.db
MODEL_PATH=./data/models/lstm_forecaster.pt
```

## 🎯 Key Features

1. **Inventory Overview** - Track ingredient levels in real-time
2. **Demand Forecasting** - AI-powered predictions (7/30/90 days)
3. **Shipment Tracking** - Monitor deliveries and delays
4. **Cost Optimization** - Pareto 80/20 analysis
5. **Alerts** - Low-stock and overstock warnings
6. **Bilingual** - English/中文 support
7. **Theme** - Light/Dark mode

## 🗂️ Project Structure

```
mai-shan-yun-inventory-intel/
├── frontend/          # Next.js frontend
├── python_service/    # FastAPI backend
├── data/              # Data files
├── infra/             # Docker configuration
└── docs/              # Documentation
```

## 🚨 Troubleshooting

### Backend not starting
- Check Python version (3.11+)
- Verify dependencies installed
- Check port 8000 availability

### Frontend not starting
- Check Node.js version (18+)
- Verify dependencies installed
- Check .env.local file
- Check port 3000 availability

### Authentication not working
- Verify Google OAuth credentials
- Check redirect URI matches exactly
- Verify NEXTAUTH_SECRET is set

### No data showing
- Run seed script: `python -m app.seed_data`
- Check backend is running
- Verify API URL in .env.local

## 📖 Next Steps

1. Read the **README.md** for detailed documentation
2. Check **QUICKSTART.md** for setup instructions
3. Review **demo_script.md** for usage examples
4. Explore the dashboard features
5. Upload your own data
6. Train the ML model

## 🎨 Design Theme

**Wheat · Mountain · Cloud** (麦·山·云)
- **Wheat**: Ingredients and abundance
- **Mountain**: Stability and resilience
- **Cloud**: Forecasting and insight

## 🔗 Useful Links

- [Google Cloud Console](https://console.cloud.google.com/) - OAuth setup
- [Next.js Docs](https://nextjs.org/docs) - Frontend framework
- [FastAPI Docs](https://fastapi.tiangolo.com/) - Backend framework
- [PyTorch Docs](https://pytorch.org/docs/) - ML framework

## 💡 Tips

- Use the seed script to populate sample data
- Train the model after uploading data
- Check the dashboard for real-time updates
- Use the settings page to retrain the model
- Explore the cost optimization features

## 🐛 Issues?

- Check the troubleshooting section
- Review the documentation
- Check GitHub issues
- Verify environment variables
- Check logs for errors

## 🎉 Ready to Start?

1. Follow the Quick Start guide above
2. Set up Google OAuth credentials
3. Run the seed script for sample data
4. Access the dashboard at http://localhost:3000
5. Sign in with Google
6. Explore the features!

Happy coding! 🚀

