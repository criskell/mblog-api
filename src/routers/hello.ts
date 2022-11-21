import { Router, Request, Response } from "express";

import { UserModel } from "../models/user";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
  response.send(await UserModel.query());
});

export default router;