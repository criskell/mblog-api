import express from "express";

import helloRouter from "./hello";

const router = express.Router();

router.use("/hello", helloRouter);

export default router;
