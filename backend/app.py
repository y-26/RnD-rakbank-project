from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Sample data structure to hold items
items = {}

# Define a model for the items
class Item(BaseModel):
    name: str
    price: float

# GET endpoint: Retrieve an item by name
@app.get("/items/{item_name}")
async def get_item(item_name: str):
    if item_name in items:
        return {"name": item_name, "price": items[item_name]}
    else:
        raise HTTPException(status_code=404, detail="Item not found")

# GET endpoint: Retrieve all items
@app.get("/items/")
async def get_all_items():
    return items

# POST endpoint: Create a new item
@app.post("/items/")
async def create_item(item: Item):
    if item.name in items:
        raise HTTPException(status_code=400, detail="Item already exists")
    items[item.name] = item.price
    return {"message": "Item created", "item": item}

# POST endpoint: Update an existing item
@app.post("/items/{item_name}")
async def update_item(item_name: str, item: Item):
    if item_name not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    items[item_name] = item.price
    return {"message": "Item updated", "item": item}
