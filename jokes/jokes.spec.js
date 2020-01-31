const request = require("supertest");
const server = require("../api/server");

describe("Jokes Router", function() {
  describe("GET /", function() {
    it("should return error; no auth no jokes", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.status).not.toBe(200);
        });
    });
    it("should return a JSON", function() {
      return request(server)
        .get("/api/jokes")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});