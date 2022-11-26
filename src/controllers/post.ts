import { Request, Response } from "express";

export const create = async (request: Request, response: Response) => {
  response.json("Entrei!");
};