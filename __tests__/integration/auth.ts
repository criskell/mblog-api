import request from "supertest";
import bcrypt from "bcrypt";

import { app } from "../../src/app";
import { setupTestDatabase } from "../utils/database";
import { userRepository } from "../../src/orm/datasource";

setupTestDatabase();

describe("Autenticação", () => {
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

  describe("POST /auth/register", () => {
    it("deve criar um usuário se os dados forem corretos", async () => {
      const response = await request(app).post("/auth/register").send({
        name: "Mikasa Ackermann",
        email: "mikasa@sukasa.com",
        password: "123456"
      });

      expect(response.status).toBe(201);

      const user = await userRepository.findOneBy({ email: "mikasa@sukasa.com" });

      expect(user).toBeTruthy();
      expect(user.password).not.toBe("123456");
      expect(user.name).toBe("Mikasa Ackermann");
    });

    it("deve retornar um erro se já existir um e-mail", async () => {
      const existingUser = {
        name: "Another Levi",
        email: "levi@gmail.com",
        password: await bcrypt.hash("levi", 10),
      };

      const userToRegister = {
        name: "Levi Ackermann",
        email: "levi@gmail.com",
        password: await bcrypt.hash("leviatan", 10),
      };

      await userRepository.insert(existingUser);

      const response = await request(app).post("/auth/register").send(userToRegister);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("errors.email");
    });
  });
});