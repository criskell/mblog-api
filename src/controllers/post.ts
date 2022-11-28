import { Request, Response } from "express";

import { postRepository } from "../orm/datasource";
import { Post } from "../orm/entities/post";

export const list = async (request: Request, response: Response) => {
  const posts = await postRepository.find({
    relations: ["user"],
    select: {
      content: true,
      id: true,
      user: {
        id: true,
        name: true,
        email: true,
      },
    },
  });

  response.send({
    data: {
      posts,
    },
  });
};

export const show = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const post = await postRepository.findOne({
    relations: ["parent"],
    where: {
      id,
    },
    select: {
      parent: {
        id: true,
      },
    },
  });

  if (!post) return response.status(404).end();

  response.send({
    data: {
      post,
    },
  });
};

export const create = async (request: Request, response: Response) => {
  const { content, parentId: givenParentId } = request.body;

  const parentId = Number(givenParentId) || null;
  const parent = await postRepository.findOneBy({
    id: parentId,
  });

  if (!parent && parentId)
    return response.status(400).json({
      message: "Validation failed.",
      errors: {
        parentId: "Este post não existe.",
      },
    });

  const post = new Post();

  post.content = content;
  post.user = request.user;
  post.parent = parent;

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

  if (!post) return response.status(404).end();
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

  if (!post) return response.status(404).end();
  if (post.user.id !== request.user.id) return response.status(403).end();

  await postRepository.remove(post);

  response.status(204).end();
};
