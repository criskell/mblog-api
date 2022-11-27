import express from "express";

import checkAuth from "../middlewares/checkAuth";
import { feed } from "../controllers/feed";

const router = express.Router();

router.use(checkAuth);

router.get("/", feed);

export default router;
