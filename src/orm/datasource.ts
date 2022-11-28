import { DataSource } from "typeorm";

import { ormConfig } from "../config/orm";
import { User } from "./entities/user";
import { Post } from "./entities/post";
import { PostLike } from "./entities/postLike";

const datasource = new DataSource(ormConfig);

export const userRepository = datasource.getRepository(User);
export const postRepository = datasource.getRepository(Post);
export const postLikeRepository = datasource.getRepository(PostLike);

export default datasource;
