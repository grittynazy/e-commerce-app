const express = require("express");
const cors = require("cors"); // ✅ Add this
const app = express();

app.use(cors()); // ✅ Add this
app.use(express.json());

let products = [{ id: 1, name: "Shirt", price: 20 }];
let orders = [];
let users = [{ username: "admin", password: "admin" }];

app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

app.get("/products", (req, res) => res.json(products));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const valid = users.find(u => u.username === username && u.password === password);
  valid ? res.json({ token: "fake-jwt-token" }) : res.status(401).send("Unauthorized");
});

app.post("/orders", (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).send("Product not found");
  const order = { id: orders.length + 1, product };
  orders.push(order);
  res.status(201).json(order);
});

app.listen(5000, () => console.log("API running on port 5000"));
module.exports = app;

