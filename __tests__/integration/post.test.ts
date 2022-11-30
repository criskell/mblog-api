import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { app } from "../../src/app";
import { setupTestDatabase } from "../utils/database";
import { postRepository, userRepository } from "../../src/orm/datasource";
import { User } from "../../src/orm/entities/user";
import { Post } from "../../src/orm/entities/post";

setupTestDatabase();

describe("Posts", () => {
  let userOne: User;
  let userTwo: User;
  let userOneToken;
  let userTwoToken;

  beforeEach(async () => {
    userOne = new User;
    userOne.name = "Eren Yeager";
    userOne.email = "erenyeager@paradis.com";
    userOne.password = await bcrypt.hash("123456", 10);

    userTwo = new User;
    userTwo.name = "Mikasa Ackermann";
    userTwo.email = "mikasa@paradis.com";
    userTwo.password = await bcrypt.hash("12345", 10);

    await userRepository.save([userOne, userTwo]);

    userOneToken = `Bearer ${jwt.sign({ sub: userOne.id }, process.env.JWT_SECRET)}`;
    userTwoToken = `Bearer ${jwt.sign({ sub: userTwo.id }, process.env.JWT_SECRET)}`;
  });

  describe("GET /posts", () => {
    it("deve retornar todos os posts", async () => {
      await postRepository.insert([
        {
          content: "Goodbye",
          user: userTwo,
        },
        {
          content: "TATAKAE",
          user: userOne,
        }
      ]);

      const response = await request(app)
        .get("/posts")
        .set("Authorization", userOneToken);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data.posts");
      expect(response.body.data.posts).toHaveLength(2);
      expect(response.body.data.posts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.anything(),
            content: "Goodbye",
            user: {
              id: userTwo.id,
              name: userTwo.name,
              email: userTwo.email,
            },
          })
        ])
      );
    });
  });

  describe("GET /posts/:postId", () => {
    it("deve retornar um post específico pelo id", async () => {
      const { identifiers: [{ id }] } = await postRepository.insert({
        content: "Goodbye",
        user: userTwo,
      });

      const response = await request(app)
        .get(`/posts/${id}`)
        .set("Authorization", userTwoToken);

      expect(response.status).toBe(200);
      expect(response.body.data).toMatchObject({
        post: expect.objectContaining({
          id: expect.anything(),
          content: "Goodbye",
          user: {
            id: userTwo.id,
            name: userTwo.name,
            email: userTwo.email,
          },
        })
      });
    });
  });

  describe("POST /posts", () => {
    it("deve criar um post", async () => {
      const examplePost = {
        content: "Hello, world!",
      };

      const response = await request(app)
        .post("/posts")
        .send(examplePost)
        .set("Authorization", userOneToken);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("data.post.id");

      const postCount = await postRepository.countBy({
        id: response.body.data.post.id,
      });

      expect(postCount).toBe(1);
    });
  });

  describe("PUT /posts/:postId", () => {
    it("deve atualizar um post", async () => {
      const { identifiers: [{ id }] } = await postRepository.insert({
        content: "Helo",
        user: userOne,
      });

      const response = await request(app)
        .put(`/posts/${id}`)
        .set("Authorization", userOneToken)
        .send({
          content: "Hello",
        });

      expect(response.status).toBe(204);

      const updatedPost = await postRepository.findOneBy({
        id
      });

      expect(updatedPost.content).toBe("Hello");
    });
  });

  describe("DELETE /posts/:postId", () => {
    it("deve remover um post", async () => {
      const { identifiers: [{ id }] } = await postRepository.insert({
        content: "Hello",
        user: userOne,
      });

      const response = await request(app)
        .delete(`/posts/${id}`)
        .set("Authorization", userOneToken);

      expect(response.status).toBe(204);

      const postCount = await postRepository.countBy({
        id,
      });

      expect(postCount).toBe(0);
    });
  });
});