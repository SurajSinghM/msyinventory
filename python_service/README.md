# Mai Shan Yun Inventory Intelligence - Python Service

FastAPI backend service with PyTorch ML model for demand forecasting.

## Setup

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed database
python -m app.seed_data

# Run server
uvicorn app.main:app --reload
```

## API Endpoints

- `GET /` - Health check
- `GET /health` - Health status
- `POST /upload` - Upload CSV/XLSX files
- `POST /process` - Process uploaded data
- `POST /train` - Train forecasting model
- `GET /forecast/predict?ingredient_id={id}&horizon={days}` - Get forecast
- `POST /forecast/bulk` - Get forecasts for all ingredients
- `GET /inventory/levels` - Get inventory levels
- `GET /shipments` - Get shipment information

## Environment Variables

```
DATABASE_URL=sqlite:///./data/msy_inventory.db
PYTHON_SERVICE_HOST=0.0.0.0
PYTHON_SERVICE_PORT=8000
MODEL_PATH=./data/models/lstm_forecaster.pt
```

## Project Structure

```
python_service/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database setup
│   ├── data_processor.py    # Data processing
│   ├── forecast_service.py  # Forecasting service
│   ├── inventory_service.py # Inventory service
│   ├── shipment_service.py  # Shipment service
│   └── seed_data.py         # Database seeding
├── models/
│   ├── __init__.py
│   └── lstm_forecaster.py   # LSTM model
├── data/
│   ├── processed/           # Processed data files
│   └── models/              # Trained models
├── requirements.txt
├── Dockerfile
└── run_server.sh
```

## ML Model

The LSTM forecaster predicts ingredient demand using:
- Historical usage data
- Day-of-week patterns
- Monthly trends
- Rolling averages

## Development

```bash
# Run with auto-reload
uvicorn app.main:app --reload

# Run with custom port
uvicorn app.main:app --port 8080

# Run in production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Testing

```bash
# Test API endpoints
curl http://localhost:8000/health
curl http://localhost:8000/inventory/levels
```

## Docker

```bash
# Build image
docker build -t msy-inventory-api .

# Run container
docker run -p 8000:8000 msy-inventory-api
```

