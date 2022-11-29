import request from "supertest";
import bcrypt from "bcrypt";

import { app } from "../../src/app";
import { setupTestDatabase } from "../utils/database";
import { userRepository } from "../../src/orm/datasource";

setupTestDatabase();

describe("Rotas de autenticação", () => {
  describe("POST /auth/login", () => {
    beforeEach(async () => {
      await userRepository.insert({
        name: "John Doe",
        email: "foo@example.com",
        password: await bcrypt.hash("123456", 10),
      });
    });

    it("deve retornar um token se os dados forem válidos", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "foo@example.com",
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data.token");
    });

    it("deve retornar um erro se o e-mail e a senha não corresponderem", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "foo@example.com",
        password: "12345",
      });

      expect(response.status).toBe(403);
      expect(response.body).not.toHaveProperty("data.token");
      expect(response.body).toHaveProperty("message");
    });
  });
});