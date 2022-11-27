import { Request, Response } from "express";

import { postRepository } from "../orm/datasource";
import { Post } from "../orm/entities/post";

export const list = async (request: Request, response: Response) => {
  const posts = await postRepository.find({
    select: {
      content: true,
      id: true,
    }
  });

  response.send({
    data: {
      posts
    }
  });
};

export const show = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const post = await postRepository.findOneBy({ id });

  if (! post) return response.status(404).end();

  response.send({
    data: {
      post
    }
  });
};

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

export const update = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const post = await postRepository.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });

  if (! post) return response.status(404).end();
  if (post.user.id !== request.user.id) return response.status(403).end();

  const { content } = request.body;

  post.content = content;
  await postRepository.save(post);

  response.status(204).end();
};

export const remove = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const post = await postRepository.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });

  if (! post) return response.status(404).end();
  if (post.user.id !== request.user.id) return response.status(403).end();

  await postRepository.remove(post);

  response.status(204).end();
};