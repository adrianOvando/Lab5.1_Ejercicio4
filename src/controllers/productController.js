const ProductModel = require("../models/productModel");

const ProductController = {
  getAll: (req, res) => {
    const { category, search } = req.query;
    const products = ProductModel.getAll({ category, search });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  },

  getCategories: (req, res) => {
    const categories = ProductModel.getCategories();
    return res.status(200).json({
      success: true,
      data: categories
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto debe ser un número entero válido"
      });
    }

    const product = ProductModel.getById(numericId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${numericId} no encontrado`
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  },

  create: (req, res) => {
    const { name, description, price, stock, category } = req.body;

    // Validaciones
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto es obligatorio y no puede estar vacío"
      });
    }

    if (price === undefined || isNaN(Number(price)) || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "El precio debe ser un número mayor a 0"
      });
    }

    if (stock !== undefined && (isNaN(parseInt(stock, 10)) || parseInt(stock, 10) < 0)) {
      return res.status(400).json({
        success: false,
        message: "El stock no puede ser un número negativo"
      });
    }

    const newProduct = ProductModel.create({
      name,
      description,
      price,
      stock,
      category
    });

    return res.status(201).json({
      success: true,
      message: "Producto creado exitosamente",
      data: newProduct
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto debe ser un número entero válido"
      });
    }

    const { name, price, stock } = req.body;

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
      return res.status(400).json({
        success: false,
        message: "El nombre del producto no puede estar vacío"
      });
    }

    if (price !== undefined && (isNaN(Number(price)) || Number(price) <= 0)) {
      return res.status(400).json({
        success: false,
        message: "El precio debe ser un número mayor a 0"
      });
    }

    if (stock !== undefined && (isNaN(parseInt(stock, 10)) || parseInt(stock, 10) < 0)) {
      return res.status(400).json({
        success: false,
        message: "El stock no puede ser un número negativo"
      });
    }

    const updatedProduct = ProductModel.update(numericId, req.body);
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${numericId} no encontrado para actualizar`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Producto actualizado exitosamente",
      data: updatedProduct
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({
        success: false,
        message: "El ID del producto debe ser un número entero válido"
      });
    }

    const deleted = ProductModel.delete(numericId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Producto con ID ${numericId} no encontrado para eliminar`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Producto con ID ${numericId} eliminado exitosamente`
    });
  }
};

module.exports = ProductController;
