import { Request, Response } from "express";

import { postRepository } from "../orm/datasource";

export const feed = async (request: Request, response: Response) => {
  const page = Number(request.query.page) || 0;
  const postsPerPage = 5;

  const [posts, total] = await postRepository
    .createQueryBuilder("post")
    .innerJoin("post.user", "user")
    .leftJoinAndSelect("post.parent", "parent")
    .leftJoin("user.followers", "follower", "follower.id = :userId", {
      userId: request.user.id,
    })
    .where("follower.id = :userId OR user.id = :userId")
    .loadRelationCountAndMap("post.likeCount", "post.likes")
    .loadRelationCountAndMap("post.replyCount", "post.replies")
    .select(["post"])
    .addSelect(["user.name", "user.email", "user.id", "parent.id"])
    .orderBy("post.createdAt", "DESC")
    .skip(page * postsPerPage)
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
    },
  });
};
