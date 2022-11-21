import Knex from "knex";
import { Model } from "objection";

export const knex = Knex({
  client: "pg",
  connection: {
    host: "localhost",
    database: "mblog_api",
    port: 5432,
    user: "postgres",
    password: "postgres",
  },
});

Model.knex(knex);
