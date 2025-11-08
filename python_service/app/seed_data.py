"""
Script to seed the database with synthetic sample data for testing
"""
import sqlite3
import os
import random
from datetime import datetime, timedelta
from app.database import DB_PATH, init_db

def seed_ingredients():
    """Seed ingredients table"""
    ingredients = [
        ("braised_beef", "Braised Beef", "g", 7, 200, 100, 1000),
        ("braised_chicken", "Braised Chicken", "g", 7, 300, 150, 1200),
        ("braised_pork", "Braised Pork", "g", 7, 200, 100, 1000),
        ("egg", "Egg", "count", 30, 100, 50, 200),
        ("rice", "Rice", "g", 365, 2000, 1000, 10000),
        ("ramen", "Ramen", "count", 90, 100, 50, 500),
        ("rice_noodles", "Rice Noodles", "g", 90, 1500, 750, 6000),
        ("chicken_thigh", "Chicken Thigh", "pcs", 3, 10, 5, 50),
        ("chicken_wings", "Chicken Wings", "pcs", 3, 200, 100, 500),
        ("flour", "Flour", "g", 180, 1000, 500, 5000),
        ("pickle_cabbage", "Pickle Cabbage", "g", 30, 500, 250, 2000),
        ("green_onion", "Green Onion", "g", 7, 200, 100, 1000),
        ("cilantro", "Cilantro", "g", 7, 100, 50, 500),
        ("white_onion", "White Onion", "count", 30, 20, 10, 100),
        ("peas", "Peas", "g", 7, 500, 250, 2000),
        ("carrot", "Carrot", "g", 14, 500, 250, 2000),
        ("bokchoy", "Bokchoy", "g", 7, 500, 250, 2000),
        ("tapioca_starch", "Tapioca Starch", "g", 365, 500, 250, 2000),
    ]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    for ing in ingredients:
        cursor.execute("""
            INSERT OR REPLACE INTO ingredients 
            (ingredient_id, ingredient_name, unit, shelf_life_days, reorder_point, safety_stock, par_level)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, ing)
    
    conn.commit()
    conn.close()
    print(f"Seeded {len(ingredients)} ingredients")

def seed_purchases():
    """Seed purchases table with synthetic data"""
    ingredients = [
        "braised_beef", "braised_chicken", "braised_pork", "egg", "rice",
        "ramen", "rice_noodles", "green_onion", "cilantro", "white_onion"
    ]
    vendors = ["Fresh Produce Co.", "Meat Distributors Inc.", "Grain Suppliers", "Asian Market"]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Generate purchases for the last 90 days
    start_date = datetime.now() - timedelta(days=90)
    
    for i in range(50):
        date = start_date + timedelta(days=random.randint(0, 90))
        ingredient_id = random.choice(ingredients)
        vendor = random.choice(vendors)
        quantity = random.uniform(10, 100)
        unit_cost = random.uniform(1, 10)
        total_cost = quantity * unit_cost
        
        cursor.execute("""
            INSERT INTO purchases 
            (vendor, ingredient_id, ingredient_name, quantity, unit, unit_cost, total_cost, purchase_date, invoice_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            vendor,
            ingredient_id,
            ingredient_id.replace("_", " ").title(),
            quantity,
            "g" if "g" in ingredient_id else "count",
            unit_cost,
            total_cost,
            date.isoformat(),
            f"INV-{random.randint(1000, 9999)}"
        ))
    
    conn.commit()
    conn.close()
    print("Seeded 50 purchases")

def seed_shipments():
    """Seed shipments table with synthetic data"""
    ingredients = [
        "braised_beef", "braised_chicken", "braised_pork", "rice", "ramen"
    ]
    vendors = ["Fresh Produce Co.", "Meat Distributors Inc.", "Grain Suppliers"]
    statuses = ["delivered", "in_transit", "delayed"]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    start_date = datetime.now() - timedelta(days=30)
    
    for i in range(20):
        shipped_date = start_date + timedelta(days=random.randint(0, 30))
        status = random.choice(statuses)
        
        if status == "delivered":
            arrived_date = shipped_date + timedelta(days=random.randint(1, 7))
            lead_time = (arrived_date - shipped_date).days
        elif status == "delayed":
            arrived_date = None
            lead_time = None
        else:
            arrived_date = None
            lead_time = None
        
        ingredient_id = random.choice(ingredients)
        vendor = random.choice(vendors)
        quantity = random.uniform(20, 100)
        
        cursor.execute("""
            INSERT INTO shipments 
            (vendor, ingredient_id, quantity, shipped_date, arrived_date, status, lead_time_days, tracking_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            vendor,
            ingredient_id,
            quantity,
            shipped_date.isoformat(),
            arrived_date.isoformat() if arrived_date else None,
            status,
            lead_time,
            f"TRK{random.randint(100000, 999999)}"
        ))
    
    conn.commit()
    conn.close()
    print("Seeded 20 shipments")

def seed_sales():
    """Seed sales table with synthetic data"""
    menu_items = [
        ("beef_ramen", "Beef Ramen", 12.99),
        ("chicken_ramen", "Chicken Ramen", 12.99),
        ("pork_ramen", "Pork Ramen", 12.99),
        ("beef_fried_rice", "Beef Fried Rice", 11.99),
        ("chicken_fried_rice", "Chicken Fried Rice", 11.99),
        ("pork_fried_rice", "Pork Fried Rice", 11.99),
        ("fried_wings", "Fried Wings", 8.99),
    ]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    start_date = datetime.now() - timedelta(days=90)
    
    for i in range(200):
        date = start_date + timedelta(days=random.randint(0, 90))
        menu_item_id, menu_item_name, price = random.choice(menu_items)
        units_sold = random.randint(1, 10)
        revenue = units_sold * price
        
        cursor.execute("""
            INSERT INTO sales 
            (date, menu_item_id, units_sold, price, revenue)
            VALUES (?, ?, ?, ?, ?)
        """, (date.isoformat(), menu_item_id, units_sold, price, revenue))
    
    conn.commit()
    conn.close()
    print("Seeded 200 sales records")

def seed_recipe():
    """Seed recipe table with menu item to ingredient mappings"""
    recipes = [
        # Beef Ramen
        ("beef_ramen", "braised_beef", 140),
        ("beef_ramen", "egg", 0.5),
        ("beef_ramen", "ramen", 1),
        ("beef_ramen", "green_onion", 20),
        ("beef_ramen", "cilantro", 20),
        
        # Chicken Ramen
        ("chicken_ramen", "braised_chicken", 140),
        ("chicken_ramen", "egg", 0.5),
        ("chicken_ramen", "ramen", 1),
        ("chicken_ramen", "green_onion", 20),
        ("chicken_ramen", "cilantro", 20),
        
        # Pork Ramen
        ("pork_ramen", "braised_pork", 140),
        ("pork_ramen", "egg", 0.5),
        ("pork_ramen", "ramen", 1),
        ("pork_ramen", "green_onion", 20),
        ("pork_ramen", "cilantro", 20),
        
        # Beef Fried Rice
        ("beef_fried_rice", "braised_beef", 100),
        ("beef_fried_rice", "egg", 1),
        ("beef_fried_rice", "rice", 350),
        ("beef_fried_rice", "white_onion", 20),
        ("beef_fried_rice", "peas", 10),
        ("beef_fried_rice", "carrot", 10),
        
        # Chicken Fried Rice
        ("chicken_fried_rice", "braised_chicken", 100),
        ("chicken_fried_rice", "egg", 1),
        ("chicken_fried_rice", "rice", 350),
        ("chicken_fried_rice", "white_onion", 20),
        ("chicken_fried_rice", "peas", 10),
        ("chicken_fried_rice", "carrot", 10),
        
        # Pork Fried Rice
        ("pork_fried_rice", "braised_pork", 100),
        ("pork_fried_rice", "egg", 1),
        ("pork_fried_rice", "rice", 350),
        ("pork_fried_rice", "white_onion", 20),
        ("pork_fried_rice", "peas", 10),
        ("pork_fried_rice", "carrot", 10),
        
        # Fried Wings
        ("fried_wings", "chicken_wings", 8),
        ("fried_wings", "flour", 50),
    ]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    for recipe in recipes:
        cursor.execute("""
            INSERT OR REPLACE INTO recipe 
            (menu_item_id, ingredient_id, qty_per_serving)
            VALUES (?, ?, ?)
        """, recipe)
    
    conn.commit()
    conn.close()
    print(f"Seeded {len(recipes)} recipe mappings")

def main():
    """Main function to seed all data"""
    print("Initializing database...")
    init_db()
    
    print("Seeding data...")
    seed_ingredients()
    seed_purchases()
    seed_shipments()
    seed_sales()
    seed_recipe()
    
    print("Data seeding completed!")

if __name__ == "__main__":
    main()

