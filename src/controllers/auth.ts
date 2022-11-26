import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userRepository } from "../orm/datasource";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await userRepository.findOneBy({ email });

  if (! user) return response.status(400).json({
    error: "Nenhum usuário encontrado para este e-mail."
  });

  const validPassword = await bcrypt.compare(password, user.password);

  if (! validPassword) return response.status(400).json({
    error: "Senha inválida."
  });

  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);

  response.json({
    token: `Bearer ${token}`
  });
};

export const register = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const emailCount = await userRepository.countBy({
    email
  });

  if (emailCount) return response.status(400).json({
    message: "Validation failed.",
    errors: {
      email: "O e-mail está ocupado.",
    },
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await userRepository.insert({
    name,
    email,
    password: hashedPassword,
  });

  return response.status(201).json({ message: "Usuário criado com sucesso." });
};