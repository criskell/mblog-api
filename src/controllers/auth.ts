import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { userRepository } from "../orm/datasource";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  if (! (email && password)) return response.status(400).json({
    error: "Informe e-mail e senha."
  });

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

  if (! (name && email && password)) return response.status(400).json({
    error: "Informe nome, e-mail e senha."
  });

  const emailOcurrencesCount = await userRepository.countBy({
    email
  });

  if (emailOcurrencesCount) return response.status(400).json({
    error: "O e-mail não é único.",
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.insert({
    name,
    email,
    password: hashedPassword,
  });

  return response.status(201).json({ message: "Usuário criado com sucesso." });
};