import { Request, Response } from "express";

import { userRepository, postRepository } from "../orm/datasource";

export const feed = async (request: Request, response: Response) => {
  const page = Number(request.query.page) || 0;
  const postsPerPage = 50;

  const [posts, total] = await postRepository.findAndCount({
    take: postsPerPage,
    skip: page * postsPerPage,
    relations: ["user"],
    where: {
      user: {
        followers: {
          id: request.user.id,
        }
      }
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        id: true,
        name: true,
        email: true,
      },
    },
    order: {
      createdAt: "DESC"
    }
  });

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