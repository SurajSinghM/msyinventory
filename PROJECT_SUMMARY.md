# Mai Shan Yun Inventory Intelligence Dashboard - Project Summary

## Overview

A full-stack inventory management dashboard that transforms raw restaurant data into actionable intelligence using AI-powered forecasting, real-time tracking, and cost optimization.

## Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom Chinese color palette
- **Authentication**: NextAuth with Google OAuth
- **Visualizations**: Recharts for charts and graphs
- **Animations**: Framer Motion for flame logo
- **Internationalization**: Bilingual support (English/中文)
- **Theme**: Light/Dark mode with persistence

### Backend (FastAPI)
- **Framework**: FastAPI with Python 3.11+
- **Database**: SQLite for metadata storage
- **ML Model**: PyTorch LSTM for demand forecasting
- **Data Processing**: Pandas for data cleaning and analysis
- **API**: RESTful API with CORS support

### Infrastructure
- **Containerization**: Docker and Docker Compose
- **Web Server**: Nginx for reverse proxy
- **Deployment**: Vercel (frontend) + Container host (backend)

## Key Features

### 1. Inventory Overview
- Real-time tracking of ingredient levels
- Sortable inventory table
- Status indicators (low stock, adequate, overstocked)
- KPI dashboard with metrics

### 2. Demand Forecasting
- LSTM-based ML model for predictions
- 7/30/90 day forecast horizons
- Reorder date recommendations
- Reorder quantity suggestions

### 3. Shipment Tracking
- Monitor shipment status
- Track lead times
- Identify delays
- Visualize shipment patterns

### 4. Cost Optimization
- Pareto 80/20 analysis
- Identify cost drivers
- Total inventory value
- Cost distribution charts

### 5. Alerts & Notifications
- Low-stock alerts
- Overstocked warnings
- Critical item notifications
- Real-time updates

### 6. Data Management
- CSV/XLSX file upload
- Data processing and validation
- Schema mapping
- Database storage

## Technical Highlights

### Machine Learning
- **Model**: LSTM (Long Short-Term Memory) neural network
- **Features**: Historical usage, day-of-week, month, rolling averages
- **Training**: Automated training pipeline with early stopping
- **Inference**: Fast prediction for all ingredients

### Data Pipeline
1. Upload CSV/XLSX files
2. Process and validate data
3. Map to canonical schema
4. Store in database
5. Train ML model
6. Generate forecasts
7. Display in dashboard

### User Experience
- **Bilingual**: English and Chinese support
- **Responsive**: Works on desktop and mobile
- **Theme**: Light/Dark mode
- **Animations**: Smooth transitions and flame logo
- **Accessibility**: Semantic HTML and ARIA labels

## Data Schema

### Tables
- **purchases**: Purchase transactions
- **shipments**: Shipment tracking
- **usage**: Ingredient usage
- **recipe**: Menu item recipes
- **ingredients**: Ingredient metadata
- **sales**: Sales transactions

## API Endpoints

### Data Management
- `POST /upload` - Upload files
- `POST /process` - Process data
- `POST /train` - Train model

### Forecasting
- `GET /forecast/predict` - Single ingredient forecast
- `POST /forecast/bulk` - Bulk forecasts

### Inventory
- `GET /inventory/levels` - Current inventory

### Shipments
- `GET /shipments` - Shipment information

## Setup & Deployment

### Local Development
1. Backend: `cd python_service && ./run_server.sh`
2. Frontend: `cd frontend && npm install && npm run dev`
3. Access: http://localhost:3000

### Docker Deployment
```bash
cd infra
docker-compose up --build
```

### Production Deployment
- Frontend: Deploy to Vercel
- Backend: Deploy to container host (AWS ECS, Google Cloud Run, etc.)
- Database: SQLite (or migrate to PostgreSQL for production)

## Environment Variables

### Frontend
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Backend
- `DATABASE_URL`
- `PYTHON_SERVICE_HOST`
- `PYTHON_SERVICE_PORT`
- `MODEL_PATH`

## Performance Metrics

### Expected Improvements
- **Stockouts**: 40% reduction
- **Inventory Turnover**: 25% improvement
- **Cost Optimization**: 80/20 rule identification
- **Forecast Accuracy**: 30-day horizon predictions

## File Structure

```
mai-shan-yun-inventory-intel/
├── frontend/              # Next.js frontend
├── python_service/        # FastAPI backend
├── data/                  # Data files
├── infra/                 # Docker configuration
├── README.md              # Main documentation
├── QUICKSTART.md          # Quick start guide
├── demo_script.md         # Demo scripts
├── CHECKLIST.md           # Project checklist
└── PROJECT_SUMMARY.md     # This file
```

## Technologies Used

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth
- Recharts
- Framer Motion
- React Hot Toast

### Backend
- FastAPI
- PyTorch
- Pandas
- SQLite
- Uvicorn

### Infrastructure
- Docker
- Docker Compose
- Nginx

## Future Enhancements

- Additional ML models (ARIMA, Prophet)
- More visualizations (Sankey diagrams, heatmaps)
- Export functionality (PDF, Excel)
- Email notifications
- Mobile app
- Multi-restaurant support
- Advanced analytics
- POS system integration

## License

MIT License

## Acknowledgments

- Design inspired by Chinese paper and ink visuals
- Color palette based on traditional Chinese aesthetics
- Theme: Wheat (ingredients), Mountain (stability), Cloud (forecasting)

## Contact

For issues and questions, please open an issue on GitHub.

