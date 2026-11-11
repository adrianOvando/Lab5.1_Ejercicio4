const request = require("supertest");
const app = require("../src/app");

describe("Health Check y Rutas Base", () => {
  test("GET /health debe responder con estado 200 y status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("timestamp");
  });

  test("GET /ruta-inexistente debe responder con estado 404", async () => {
    const res = await request(app).get("/ruta-inexistente");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("success", false);
    expect(res.body).toHaveProperty("message", "Ruta no encontrada");
  });

  test("Prueba intencional que debe fallar para demostracion de CI", () => {
    expect(true).toBe(false);
  });
});
