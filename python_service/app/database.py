import sqlite3
import os
from contextlib import contextmanager

DB_PATH = os.getenv("DATABASE_URL", "sqlite:///./data/msy_inventory.db").replace("sqlite:///", "")

# Ensure directory exists
db_dir = os.path.dirname(DB_PATH) if os.path.dirname(DB_PATH) else "."
if db_dir:
    os.makedirs(db_dir, exist_ok=True)

def init_db():
    """Initialize database with schema"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS purchases (
            purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
            vendor TEXT,
            ingredient_id TEXT,
            ingredient_name TEXT,
            quantity REAL,
            unit TEXT,
            unit_cost REAL,
            total_cost REAL,
            purchase_date TEXT,
            invoice_id TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS shipments (
            shipment_id INTEGER PRIMARY KEY AUTOINCREMENT,
            vendor TEXT,
            ingredient_id TEXT,
            quantity REAL,
            shipped_date TEXT,
            arrived_date TEXT,
            status TEXT,
            lead_time_days INTEGER,
            tracking_id TEXT
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usage (
            usage_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            menu_item_id TEXT,
            menu_item_name TEXT,
            quantity_sold INTEGER
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recipe (
            menu_item_id TEXT,
            ingredient_id TEXT,
            qty_per_serving REAL,
            PRIMARY KEY (menu_item_id, ingredient_id)
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS ingredients (
            ingredient_id TEXT PRIMARY KEY,
            ingredient_name TEXT,
            unit TEXT,
            shelf_life_days INTEGER,
            reorder_point REAL,
            safety_stock REAL,
            par_level REAL
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sales (
            sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            menu_item_id TEXT,
            units_sold INTEGER,
            price REAL,
            revenue REAL
        )
    """)
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS files (
            file_id TEXT PRIMARY KEY,
            filename TEXT,
            uploaded_at TEXT,
            rows_processed INTEGER
        )
    """)
    
    conn.commit()
    conn.close()

@contextmanager
def get_db():
    """Database context manager"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

