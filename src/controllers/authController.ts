import { Request, Response } from "express";
import { CreateUserData } from "../repositories/userRepository.js";
import * as authService from "../services/authService.js";

export async function registerUser(req: Request, res: Response) {
  const userInfo: CreateUserData = res.locals.body;

  await authService.addNewUser(userInfo);

  res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response) {
  const userInfo: CreateUserData = res.locals.body;

  const token = await authService.confirmAndLoginUser(userInfo);

  res.status(200).send({ token });
}
