import express, { Application } from "express";
import passport from "passport";
import Knex from "knex";
import { Model } from "objection";

import { jwtStrategy } from "./auth";
import router from "./routers";
import databaseConfig from "../config/database.js";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use(router);

const knex = Knex(databaseConfig);

Model.knex(knex);
