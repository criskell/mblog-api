import { Request, Response } from "express";

import { postLikeRepository, postRepository } from "../orm/datasource";

export const like = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const liker = request.user;
  const post = await postRepository.findOneBy({ id });

  if (!post) return response.status(404).end();

  await postLikeRepository.upsert({ liker, post }, ["likerId", "postId"]);

  return response.status(201).end();
};

export const dislike = async (request: Request, response: Response) => {
  const id = Number(request.params.postId);

  const liker = request.user;
  const post = await postRepository.findOneBy({ id });

  if (!post) return response.status(404).end();

  await postLikeRepository.delete({ liker, post });

  return response.status(204).end();
};
