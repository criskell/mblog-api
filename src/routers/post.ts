import express from "express";

import { list, show, create, update, remove } from "../controllers/post";
import { savePostValidation } from "../validations/post";
import checkAuth from "../middlewares/checkAuth";
import validate from "../middlewares/validate";

const router = express.Router();

router.use(checkAuth);

router.get("/", list);
router.get("/:postId", show);
router.put("/:postId", validate(savePostValidation), update);
router.delete("/:postId", remove);
router.post("/", validate(savePostValidation), create);

export default router;
