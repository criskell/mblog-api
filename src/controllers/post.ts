import { Request, Response } from "express";

import { postRepository } from "../orm/datasource";
import { Post } from "../orm/entities/post";

export const create = async (request: Request, response: Response) => {
  const { content } = request.body;

  const post = new Post();

  post.content = content;
  post.user = request.user;

  await postRepository.save(post);

  response.send({
    data: {
      post: {
        id: post.id,
      },
    },
  });
};
