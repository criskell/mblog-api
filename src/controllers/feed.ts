import { Request, Response } from "express";

import { userRepository, postRepository } from "../orm/datasource";

export const feed = async (request: Request, response: Response) => {
  const page = Number(request.query.page) || 0;
  const postsPerPage = 5;

  const [posts, total] = await postRepository.createQueryBuilder("post")
    .innerJoinAndSelect("post.user", "user")
    .innerJoin(
      "user.followers",
      "follower",
      "follower.id = :userId",
      { userId: request.user.id }
    )
    .loadRelationCountAndMap("post.likeCount", "post.likes")
    .select(["post"])
    .addSelect(["user.name", "user.email", "user.id"])
    .orderBy("post.createdAt", "DESC")
    .skip(page * postsPerPage)
    .take(postsPerPage)
    .getManyAndCount();

  const totalPages = Math.ceil(total / postsPerPage);
  const nextPage = page + 1 >= totalPages ? null : page + 1;

  response.json({
    data: {
      posts,
    },
    pagination: {
      totalPages,
      nextPage,
    }
  });
};