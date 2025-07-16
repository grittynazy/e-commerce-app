const request = require("supertest");
const app = require("../server");

describe("E-commerce API", () => {
  it("GET /products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("POST /login success", async () => {
    const res = await request(app).post("/login").send({ username: "admin", password: "admin" });
    expect(res.statusCode).toBe(200);
  });

  it("POST /orders", async () => {
    const res = await request(app).post("/orders").send({ productId: 1 });
    expect(res.statusCode).toBe(201);
  });
});

