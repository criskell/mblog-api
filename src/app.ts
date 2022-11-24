import "reflect-metadata";

import express, { Application } from "express";
import passport from "passport";

import { jwtStrategy } from "./config/passport";
import router from "./routers";

import datasource from "./orm/datasource";

export const app: Application = express();

export const init = async () => {
  await datasource.initialize();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  passport.use("jwt", jwtStrategy);

  app.use(router);

  return app;
};