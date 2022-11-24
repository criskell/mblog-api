import { DataSource } from "typeorm";

import { ormConfig } from "../config/orm"; 
import { User } from "./entities/user";

const datasource = new DataSource(ormConfig);

export const userRepository = datasource.getRepository(User);

export default datasource;