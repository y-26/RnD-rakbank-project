import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/items/');
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    const response = await fetch('/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });

    if (response.ok) {
      fetchItems();
      setName('');
      setPrice('');
    } else {
      console.error('Failed to add item');
    }
  };

  return (
    <div>
      <h1>Items and Prices</h1>
      <ul>
        {Object.keys(items).map(item => (
          <li key={item}>
            {item}: ${items[item]}
          </li>
        ))}
      </ul>

      <h2>Add Item</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
