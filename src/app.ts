import express, { Application } from "express";

import appRouter from "./routers";
import "./database";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appRouter);
