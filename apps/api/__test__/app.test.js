const request = require("supertest");
const app = require("../src");

describe("ROUTE ACCOUNT", () => {
  it("Should return response", async () => {
    const results = await request(app).get("/api");
    expect(results.status).toBe(200);
    expect(results.text).toEqual("<h1>API in TURBOREPO</h1>");
  });
  it("Keeplogin user expect 200", async () => {
    const result = (await request(app).get("/account/keeplogin")).setEncoding("Authorization", `Bearer `)
    expect(result.status).toBe(200)
  })
});
