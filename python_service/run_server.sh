#!/bin/bash

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create data directories
mkdir -p data/processed data/models

# Set environment variables
export DATABASE_URL=sqlite:///./data/msy_inventory.db
export MODEL_PATH=./data/models/lstm_forecaster.pt

# Seed database with sample data
echo "Seeding database with sample data..."
python -m app.seed_data

# Run the server
echo "Starting server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

