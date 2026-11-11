const request = require("supertest");
const app = require("../src/app");
const ProductModel = require("../src/models/productModel");

describe("API de Productos (/api/products)", () => {
  beforeEach(() => {
    // Restaurar el estado inicial antes de cada prueba
    ProductModel.reset();
  });

  describe("GET /api/products", () => {
    test("debe retornar la lista de todos los productos", async () => {
      const res = await request(app).get("/api/products");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(3);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(3);
    });

    test("debe filtrar productos por categoría", async () => {
      const res = await request(app).get("/api/products?category=accesorios");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(2);
      expect(res.body.data.every((p) => p.category === "accesorios")).toBe(true);
    });

    test("debe filtrar productos por término de búsqueda", async () => {
      const res = await request(app).get("/api/products?search=thinkpad");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(1);
      expect(res.body.data[0].name).toContain("ThinkPad");
    });
  });

  describe("GET /api/products/:id", () => {
    test("debe retornar un producto específico cuando el ID existe", async () => {
      const res = await request(app).get("/api/products/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("id", 1);
      expect(res.body.data.name).toBe("Laptop ThinkPad");
    });

    test("debe retornar 404 si el producto no existe", async () => {
      const res = await request(app).get("/api/products/999");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("no encontrado");
    });

    test("debe retornar 400 si el ID no es numérico", async () => {
      const res = await request(app).get("/api/products/abc");

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("debe ser un número entero");
    });
  });

  describe("POST /api/products", () => {
    test("debe crear un nuevo producto con datos válidos", async () => {
      const newProductData = {
        name: "Monitor Gamer 27 pulgadas",
        description: "Panel IPS 144Hz 1ms",
        price: 299.99,
        stock: 10,
        category: "monitores"
      };

      const res = await request(app)
        .post("/api/products")
        .send(newProductData);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Producto creado exitosamente");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.name).toBe(newProductData.name);
      expect(res.body.data.price).toBe(299.99);
      expect(res.body.data.stock).toBe(10);
    });

    test("debe crear un nuevo producto con valores por defecto cuando opcionales se omiten", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Cargador USB-C", price: 15.0 });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.stock).toBe(0);
      expect(res.body.data.category).toBe("general");
      expect(res.body.data.description).toBe("");
    });

    test("debe retornar 400 si falta el nombre o está vacío", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ price: 100 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("nombre del producto es obligatorio");
    });

    test("debe retornar 400 si el precio es inválido o negativo", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Parlante", price: -10 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("precio debe ser un número mayor a 0");
    });

    test("debe retornar 400 si el stock es negativo", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Webcam HD", price: 45, stock: -5 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("stock no puede ser un número negativo");
    });
  });

  describe("PUT /api/products/:id", () => {
    test("debe actualizar un producto existente", async () => {
      const updateData = {
        name: "Laptop ThinkPad E14 Gen 4",
        price: 1350.0,
        stock: 20
      };

      const res = await request(app)
        .put("/api/products/1")
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.price).toBe(updateData.price);
      expect(res.body.data.stock).toBe(updateData.stock);
    });

    test("debe retornar 404 al intentar actualizar un producto inexistente", async () => {
      const res = await request(app)
        .put("/api/products/999")
        .send({ name: "Inexistente" });

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test("debe retornar 400 si el ID no es numérico", async () => {
      const res = await request(app)
        .put("/api/products/invalido")
        .send({ name: "Test" });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("debe retornar 400 si el nombre enviado está vacío", async () => {
      const res = await request(app)
        .put("/api/products/1")
        .send({ name: "   " });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("debe retornar 400 si el precio enviado es menor o igual a 0", async () => {
      const res = await request(app)
        .put("/api/products/1")
        .send({ price: 0 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test("debe retornar 400 si el stock enviado es negativo", async () => {
      const res = await request(app)
        .put("/api/products/1")
        .send({ stock: -2 });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe("DELETE /api/products/:id", () => {
    test("debe eliminar un producto existente", async () => {
      const res = await request(app).delete("/api/products/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain("eliminado exitosamente");

      // Verificar que ya no exista
      const checkRes = await request(app).get("/api/products/1");
      expect(checkRes.statusCode).toBe(404);
    });

    test("debe retornar 404 al intentar eliminar un producto inexistente", async () => {
      const res = await request(app).delete("/api/products/999");

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test("debe retornar 400 al intentar eliminar con un ID no numérico", async () => {
      const res = await request(app).delete("/api/products/abc");

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
