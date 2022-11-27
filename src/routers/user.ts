import express from "express";

import checkAuth from "../middlewares/checkAuth";
import { follow, followers, following, unfollow } from "../controllers/follow";

const router = express.Router();

router.use(checkAuth);
router.post("/:userId/follow", follow);
router.post("/:userId/unfollow", unfollow);
router.get("/:userId/followers", followers);
router.get("/:userId/following", following);

export default router;