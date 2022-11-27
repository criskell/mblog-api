import express from "express";

import auth from "./auth";
import post from "./post";
import user from "./user";
import feed from "./feed";

const router = express.Router();

router.use("/auth", auth);
router.use("/posts", post);
router.use("/users", user);
router.use("/feed", feed);

export default router;
