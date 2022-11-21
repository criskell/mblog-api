import Knex from "knex";
import { Model } from "objection";

import database from "../config/database.js";

export const knex = Knex(database);

Model.knex(knex);
