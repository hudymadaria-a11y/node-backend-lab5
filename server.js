import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ЦІ ДВА РЯДКИ — ОБОВ’ЯЗКОВІ ДЛЯ ЗБЕРЕЖЕННЯ ПРОДУКТІВ!
app.use(express.json());        // ← ОТ ЦЕЙ РЯДОК ТИ ЗАБУЛА!
app.use(cors());

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB підключено"))
  .catch(err => console.error("MongoDB помилка:", err));

// Модель
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  description: String
}));

// Роути
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Видалено" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  {
  console.log(`Сервер працює: https://node-backend-lab5.onrender.com`);
});
