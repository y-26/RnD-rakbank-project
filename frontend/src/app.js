import React, { useState, useEffect } from "react";

function Ap() {
  const [prices, setPrices] = useState([]);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const response = await fetch("/prices/");
    const data = await response.json();
    setPrices(Object.entries(data));
  };

  const addPrice = async () => {
    const response = await fetch("/prices/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_name: itemName, price: parseFloat(price) }),
    });
    if (response.ok) {
      fetchPrices();
      setItemName("");
      setPrice("");
    }
  };

  return (
    <div>
      <h1>Price List</h1>
      <ul>
        {prices.map(([name, price]) => (
          <li key={name}>{name}: ${price.toFixed(2)}</li>
        ))}
      </ul>

      <h2>Add a new price</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addPrice}>Add Price</button>
    </div>
  );
}

export default App;
