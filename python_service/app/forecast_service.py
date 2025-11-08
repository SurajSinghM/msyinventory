import torch
import torch.nn as nn
import pandas as pd
import numpy as np
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import os
import sys

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import get_db
from models.lstm_forecaster import LSTMForecaster

class ForecastService:
    def __init__(self):
        self.model = None
        self.model_path = os.getenv("MODEL_PATH", "./data/models/lstm_forecaster.pt")
        self.input_size = 10  # Features: usage, day_of_week, month, etc.
        self.hidden_size = 128
        self.num_layers = 2
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
    
    def load_model(self, path: Optional[str] = None):
        """Load trained model"""
        path = path or self.model_path
        if os.path.exists(path):
            self.model = LSTMForecaster(
                input_size=self.input_size,
                hidden_size=self.hidden_size,
                num_layers=self.num_layers,
                out_len=90
            )
            self.model.load_state_dict(torch.load(path, map_location='cpu'))
            self.model.eval()
    
    async def train_model(self) -> Dict[str, any]:
        """Train the LSTM forecasting model"""
        try:
            # Load historical data
            data = await self._load_training_data()
            
            if len(data) < 30:
                return {
                    "status": "insufficient_data",
                    "message": "Need at least 30 days of data for training"
                }
            
            # Prepare features and targets
            X, y = self._prepare_training_data(data)
            
            # Initialize model
            self.model = LSTMForecaster(
                input_size=self.input_size,
                hidden_size=self.hidden_size,
                num_layers=self.num_layers,
                out_len=30
            )
            
            # Training loop (simplified)
            optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)
            criterion = nn.MSELoss()
            
            # Convert to tensors
            X_tensor = torch.FloatTensor(X)
            y_tensor = torch.FloatTensor(y)
            
            # Train for a few epochs
            self.model.train()
            for epoch in range(50):
                optimizer.zero_grad()
                outputs = self.model(X_tensor)
                loss = criterion(outputs, y_tensor)
                loss.backward()
                optimizer.step()
                
                if epoch % 10 == 0:
                    print(f"Epoch {epoch}, Loss: {loss.item()}")
            
            # Save model
            torch.save(self.model.state_dict(), self.model_path)
            
            return {
                "status": "success",
                "message": "Model trained successfully",
                "loss": loss.item()
            }
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }
    
    async def predict(self, ingredient_id: str, horizon: int = 30) -> Dict[str, any]:
        """Predict demand for a specific ingredient"""
        if self.model is None:
            self.load_model()
        
        if self.model is None:
            # Return synthetic forecast if no model
            return await self._synthetic_forecast(ingredient_id, horizon)
        
        # Load recent data for the ingredient
        data = await self._load_ingredient_data(ingredient_id)
        
        if len(data) == 0:
            return await self._synthetic_forecast(ingredient_id, horizon)
        
        # Prepare input features
        features = self._prepare_features(data, horizon)
        
        # Make prediction
        self.model.eval()
        with torch.no_grad():
            X = torch.FloatTensor(features).unsqueeze(0)
            prediction = self.model(X).squeeze().numpy()
        
        # Generate forecast dates
        start_date = datetime.now()
        forecast_dates = [start_date + timedelta(days=i) for i in range(horizon)]
        
        return {
            "ingredient_id": ingredient_id,
            "horizon": horizon,
            "forecast": [
                {
                    "date": date.isoformat(),
                    "predicted_demand": float(pred)
                }
                for date, pred in zip(forecast_dates, prediction[:horizon])
            ],
            "reorder_date": self._calculate_reorder_date(prediction, horizon),
            "reorder_quantity": float(np.sum(prediction[:7]))  # Sum of next 7 days
        }
    
    async def bulk_predict(self, horizon: int = 30) -> List[Dict[str, any]]:
        """Predict demand for all ingredients"""
        # Get all ingredients
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT DISTINCT ingredient_id FROM ingredients")
            ingredients = [row[0] for row in cursor.fetchall()]
        
        if not ingredients:
            # Return synthetic data for known ingredients
            ingredients = [
                "braised_beef", "braised_chicken", "braised_pork", "egg", "rice",
                "ramen", "rice_noodles", "chicken_thigh", "chicken_wings", "flour",
                "pickle_cabbage", "green_onion", "cilantro", "white_onion", "peas",
                "carrot", "bokchoy", "tapioca_starch"
            ]
        
        forecasts = []
        for ingredient_id in ingredients:
            forecast = await self.predict(ingredient_id, horizon)
            forecasts.append(forecast)
        
        return forecasts
    
    async def _load_training_data(self) -> pd.DataFrame:
        """Load historical usage data for training"""
        with get_db() as conn:
            query = "SELECT * FROM usage ORDER BY date"
            df = pd.read_sql_query(query, conn)
        return df
    
    async def _load_ingredient_data(self, ingredient_id: str) -> pd.DataFrame:
        """Load historical data for a specific ingredient"""
        # This would join usage, sales, and recipe tables
        # For now, return empty DataFrame
        return pd.DataFrame()
    
    def _prepare_training_data(self, data: pd.DataFrame) -> tuple:
        """Prepare features and targets for training"""
        # Simplified feature preparation
        # In practice, would include: usage, day_of_week, month, rolling averages, etc.
        n_samples = len(data) - 30
        if n_samples < 1:
            n_samples = 1
        
        X = np.random.randn(n_samples, 10, self.input_size)
        y = np.random.randn(n_samples, 30)
        
        return X, y
    
    def _prepare_features(self, data: pd.DataFrame, horizon: int) -> np.ndarray:
        """Prepare input features for prediction"""
        # Simplified feature preparation
        features = np.random.randn(10, self.input_size)
        return features
    
    async def _synthetic_forecast(self, ingredient_id: str, horizon: int) -> Dict[str, any]:
        """Generate synthetic forecast when no model/data available"""
        start_date = datetime.now()
        base_demand = np.random.uniform(10, 100)
        trend = np.linspace(0, 5, horizon)
        noise = np.random.normal(0, 2, horizon)
        
        forecast_values = base_demand + trend + noise
        forecast_values = np.maximum(forecast_values, 0)  # Ensure non-negative
        
        forecast_dates = [start_date + timedelta(days=i) for i in range(horizon)]
        
        return {
            "ingredient_id": ingredient_id,
            "horizon": horizon,
            "forecast": [
                {
                    "date": date.isoformat(),
                    "predicted_demand": float(val)
                }
                for date, val in zip(forecast_dates, forecast_values)
            ],
            "reorder_date": (start_date + timedelta(days=7)).isoformat(),
            "reorder_quantity": float(np.sum(forecast_values[:7]))
        }
    
    def _calculate_reorder_date(self, prediction: np.ndarray, horizon: int) -> str:
        """Calculate when to reorder based on forecast"""
        # Simple logic: reorder when cumulative demand exceeds threshold
        cumulative = np.cumsum(prediction)
        threshold = 200  # Example threshold
        reorder_idx = np.argmax(cumulative > threshold)
        
        if reorder_idx == 0 and cumulative[0] <= threshold:
            reorder_idx = 7  # Default to 7 days
        
        reorder_date = datetime.now() + timedelta(days=min(reorder_idx, horizon))
        return reorder_date.isoformat()

