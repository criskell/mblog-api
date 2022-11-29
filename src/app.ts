import "reflect-metadata";

import express, { Application } from "express";
import passport from "passport";

import { jwtStrategy } from "./config/passport";
import router from "./routers";
import * as errorHandler from "./middlewares/errorHandler";

export const app: Application = express();

// Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use(router);

// Error handling
app.use(errorHandler.validation);
app.use(errorHandler.api);