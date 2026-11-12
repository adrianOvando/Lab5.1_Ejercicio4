/**
 * Modelo en memoria para la entidad Product
 */

let products = [
  {
    id: 1,
    name: "Laptop ThinkPad",
    description: "Portátil empresarial Intel i7, 16GB RAM",
    price: 1200.0,
    stock: 15,
    category: "computacion",
    createdAt: new Date("2026-01-01T00:00:00.000Z")
  },
  {
    id: 2,
    name: "Mouse Inalámbrico",
    description: "Mouse óptico ergonómico 2.4GHz",
    price: 25.5,
    stock: 50,
    category: "accesorios",
    createdAt: new Date("2026-01-02T00:00:00.000Z")
  },
  {
    id: 3,
    name: "Teclado Mecánico RGB",
    description: "Teclado switches azules distribución ISO",
    price: 85.0,
    stock: 30,
    category: "accesorios",
    createdAt: new Date("2026-01-03T00:00:00.000Z")
  }
];

let nextId = 4;

const ProductModel = {
  getAll: (filters = {}) => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    return result;
  },

  getById: (id) => {
    const numericId = parseInt(id, 10);
    return products.find((p) => p.id === numericId) || null;
  },

  getCategories: () => {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories);
  },

  create: (data) => {
    const newProduct = {
      id: nextId++,
      name: data.name.trim(),
      description: data.description ? data.description.trim() : "",
      price: Number(data.price),
      stock: data.stock !== undefined ? parseInt(data.stock, 10) : 0,
      category: data.category ? data.category.trim() : "general",
      createdAt: new Date()
    };

    products.push(newProduct);
    return newProduct;
  },

  update: (id, data) => {
    const numericId = parseInt(id, 10);
    const index = products.findIndex((p) => p.id === numericId);

    if (index === -1) {
      return null;
    }

    const current = products[index];
    const updated = {
      ...current,
      name: data.name !== undefined ? data.name.trim() : current.name,
      description:
        data.description !== undefined
          ? data.description.trim()
          : current.description,
      price: data.price !== undefined ? Number(data.price) : current.price,
      stock:
        data.stock !== undefined ? parseInt(data.stock, 10) : current.stock,
      category:
        data.category !== undefined ? data.category.trim() : current.category,
      updatedAt: new Date()
    };

    products[index] = updated;
    return updated;
  },

  delete: (id) => {
    const numericId = parseInt(id, 10);
    const index = products.findIndex((p) => p.id === numericId);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);
    return true;
  },

  // Método auxiliar para pruebas unitarias
  reset: () => {
    products = [
      {
        id: 1,
        name: "Laptop ThinkPad",
        description: "Portátil empresarial Intel i7, 16GB RAM",
        price: 1200.0,
        stock: 15,
        category: "computacion",
        createdAt: new Date("2026-01-01T00:00:00.000Z")
      },
      {
        id: 2,
        name: "Mouse Inalámbrico",
        description: "Mouse óptico ergonómico 2.4GHz",
        price: 25.5,
        stock: 50,
        category: "accesorios",
        createdAt: new Date("2026-01-02T00:00:00.000Z")
      },
      {
        id: 3,
        name: "Teclado Mecánico RGB",
        description: "Teclado switches azules distribución ISO",
        price: 85.0,
        stock: 30,
        category: "accesorios",
        createdAt: new Date("2026-01-03T00:00:00.000Z")
      }
    ];
    nextId = 4;
  }
};

module.exports = ProductModel;
