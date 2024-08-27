from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

# Sample data storage
prices = {}

# Define a model for price data
class PriceItem(BaseModel):
    item_name: str
    price: float

# GET endpoint: Retrieve price by item name
@app.get("/prices/{item_name}")
async def get_price(item_name: str):
    if item_name in prices:
        return {"item_name": item_name, "price": prices[item_name]}
    else:
        raise HTTPException(status_code=404, detail="Price not found")

# GET endpoint: Retrieve all prices
@app.get("/prices/")
async def get_all_prices():
    return prices

# POST endpoint: Add a new price
@app.post("/prices/")
async def create_price(price_item: PriceItem):
    if price_item.item_name in prices:
        raise HTTPException(status_code=400, detail="Item already exists")
    prices[price_item.item_name] = price_item.price
    return {"message": "Price added", "price_item": price_item}

# POST endpoint: Update an existing price
@app.post("/prices/{item_name}")
async def update_price(item_name: str, price_item: PriceItem):
    if item_name not in prices:
        raise HTTPException(status_code=404, detail="Price not found")
    prices[item_name] = price_item.price
    return {"message": "Price updated", "price_item": price_item}

# External API call example
@app.get("/external/")
async def call_external_api():
    external_url = "https://jsonplaceholder.typicode.com/todos/1"  # Example URL
    response = requests.get(external_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="External request failed")
