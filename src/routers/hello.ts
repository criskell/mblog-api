import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.send("Hello, world!");
});

export default router;
