import { DataSource } from "typeorm";

import { ormConfig } from "../config/orm";
import { User } from "./entities/user";
import { Post } from "./entities/post";

const datasource = new DataSource(ormConfig);

export const userRepository = datasource.getRepository(User);
export const postRepository = datasource.getRepository(Post);

export default datasource;