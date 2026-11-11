const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint de salud
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API
app.use("/api/products", productRoutes);

// Manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

module.exports = app;

