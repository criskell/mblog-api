import express from "express";

import { list, show, create, update, remove } from "../controllers/post";
import { like, dislike } from "../controllers/like";
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

router.post("/:postId/like", like);
router.delete("/:postId/like", dislike);

export default router;
