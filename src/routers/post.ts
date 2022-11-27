import express from "express";

import { create } from "../controllers/post";
import { createPostValidation } from "../validations/post";
import checkAuth from "../middlewares/checkAuth";
import validate from "../middlewares/validate";

const router = express.Router();

router.use(checkAuth);

router.post("/", validate(createPostValidation), create);

export default router;
