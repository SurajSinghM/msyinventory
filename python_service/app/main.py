from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import os
from typing import Optional, List
from pydantic import BaseModel
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import init_db, get_db
from app.data_processor import DataProcessor
from app.forecast_service import ForecastService
from app.inventory_service import InventoryService
from app.shipment_service import ShipmentService

app = FastAPI(title="Mai Shan Yun Inventory Intelligence API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
data_processor = DataProcessor()
forecast_service = ForecastService()
inventory_service = InventoryService()
shipment_service = ShipmentService()

@app.on_event("startup")
async def startup_event():
    init_db()
    # Load existing model if available
    model_path = os.getenv("MODEL_PATH", "./data/models/lstm_forecaster.pt")
    if os.path.exists(model_path):
        forecast_service.load_model(model_path)

# Request/Response models
class ForecastRequest(BaseModel):
    ingredient_id: str
    horizon: int = 30

class BulkForecastRequest(BaseModel):
    horizon: int = 30

class UploadResponse(BaseModel):
    message: str
    file_id: str
    rows_processed: int

class ProcessRequest(BaseModel):
    file_id: Optional[str] = None

# Health check
@app.get("/")
async def root():
    return {"message": "Mai Shan Yun Inventory Intelligence API"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Upload endpoint
@app.post("/upload", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    """Upload CSV or XLSX file for processing"""
    try:
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext == '.csv':
            df = pd.read_csv(file.file)
        elif file_ext in ['.xlsx', '.xls']:
            df = pd.read_excel(file.file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Use CSV or XLSX.")
        
        # Process the file
        file_id = await data_processor.process_file(df, file.filename)
        rows_processed = len(df)
        
        return UploadResponse(
            message="File uploaded and processed successfully",
            file_id=file_id,
            rows_processed=rows_processed
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

# Process endpoint
@app.post("/process")
async def process_data(request: ProcessRequest):
    """Clean and canonicalize uploaded data"""
    try:
        result = await data_processor.canonicalize_data(request.file_id)
        return {"message": "Data processed successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing data: {str(e)}")

# Training endpoint
@app.post("/train")
async def train_model():
    """Trigger model training"""
    try:
        result = await forecast_service.train_model()
        return {"message": "Model training completed", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error training model: {str(e)}")

# Forecast endpoints
@app.get("/forecast/predict")
async def predict_forecast(ingredient_id: str, horizon: int = 30):
    """Forecast demand for a specific ingredient"""
    try:
        forecast = await forecast_service.predict(ingredient_id, horizon)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {str(e)}")

@app.post("/forecast/bulk")
async def bulk_forecast(request: BulkForecastRequest):
    """Forecast demand for all ingredients"""
    try:
        forecasts = await forecast_service.bulk_predict(request.horizon)
        return {"forecasts": forecasts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating bulk forecast: {str(e)}")

# Inventory endpoints
@app.get("/inventory/levels")
async def get_inventory_levels():
    """Get current inventory levels and KPIs"""
    try:
        levels = await inventory_service.get_inventory_levels()
        return levels
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching inventory levels: {str(e)}")

# Shipment endpoints
@app.get("/shipments")
async def get_shipments():
    """Get shipment and delay information"""
    try:
        shipments = await shipment_service.get_shipments()
        return shipments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching shipments: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

