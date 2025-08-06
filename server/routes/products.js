const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all products
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM products");
    res.json(results);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET single product by ID
router.get("/getSingleProduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// POST create new product
router.post("/addProduct", async (req, res) => {
  const { name, description, price, image } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );
    res
      .status(201)
      .json({ message: "Product created", productId: result.insertId });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT update product
router.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?",
      [name, description, price, image, id]
    );

    res.json({ message: "Product updated" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE product
router.delete("/deleteProduct/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
