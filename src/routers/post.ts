import express from "express";

import { create } from "../controllers/post";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router.post("/", checkAuth, create);

export default router;
