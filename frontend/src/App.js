import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch products on load
  useEffect(() => {
    fetch("http://backend:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://backend:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.token);
      setMessage("Login successful!");
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please try again.");
    }
  };

  // Handle placing an order
  const handleOrder = async () => {
    if (!selectedProduct) {
      setMessage("Please select a product");
      return;
    }
    try {
      const res = await fetch("http://backend:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: selectedProduct }),
      });
      if (!res.ok) throw new Error("Order failed");
      const order = await res.json();
      setMessage(`Order placed: ${order.product.name}`);
    } catch (err) {
      console.error(err);
      setMessage("Order failed. Try again.");
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <label>
              <input
                type="radio"
                name="product"
                value={p.id}
                onChange={() => setSelectedProduct(p.id)}
              />
              {p.name} - ${p.price}
            </label>
          </li>
        ))}
      </ul>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>

      <h2>Place Order</h2>
      <button onClick={handleOrder} disabled={!token}>
        Order Selected Product
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;

