import { Request, Response } from "express";

import { userRepository } from "../orm/datasource";

export const follow = async (request: Request, response: Response) => {
  const { userId } = request.params;

  const follower = request.user;
  const followed = await userRepository.findOne({
    where: {
      id: Number(userId),
    },
  });

  if (!followed) return response.status(404).end();
  if (follower.id === followed.id) return response.status(403).end();

  followed.followers = [follower];
  await userRepository.save(followed);

  return response.status(201).end();
};

export const unfollow = async (request: Request, response: Response) => {
  const { userId } = request.params;

  const followerToRemove = request.user;
  const followed = await userRepository.findOne({
    where: {
      id: Number(userId),
    },
    relations: {
      followers: true,
    },
  });

  if (!followed) return response.status(404).end();

  followed.followers = followed.followers.filter((follower) => {
    return follower.id !== followerToRemove.id;
  });
  await userRepository.save(followed);

  return response.status(201).end();
};

export const followers = async (request: Request, response: Response) => {
  const { userId } = request.params;

  const user = await userRepository.findOne({
    where: {
      id: Number(userId),
    },
    relations: ["followers"],
    select: {
      followers: {
        id: true,
        name: true,
        email: true,
      },
    },
  });

  if (!user) return response.status(404).end();

  response.send({
    data: {
      followers: user.followers,
    },
  });
};

export const following = async (request: Request, response: Response) => {
  const { userId } = request.params;

  const user = await userRepository.findOne({
    where: {
      id: Number(userId),
    },
    select: {
      following: {
        id: true,
        name: true,
        email: true,
      },
    },
    relations: ["following"],
  });

  if (!user) return response.status(404).end();

  response.send({
    data: {
      following: user.following,
    },
  });
};
