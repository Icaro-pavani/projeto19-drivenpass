import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";
import {
  unauthorizedError,
  unprocessableError,
} from "./handleErrorsMiddleware.js";

type TokenUser = Omit<Users, "password">;

export default async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let userInfo: TokenUser;
  const token = req.headers.authorization.replace("Bearer ", "").trim();
  if (!token) {
    throw unprocessableError("Missing token!");
  }

  const secretKey = process.env.JWT_KEY;
  try {
    userInfo = jwt.verify(token, secretKey) as TokenUser;
  } catch (error) {
    throw unauthorizedError("Invalid Token Information!");
  }

  if (!userInfo.email) {
    throw unauthorizedError("Invalid Token Information!");
  }

  const user = await userRepository.findByEmail(userInfo.email);

  if (!user || user.id !== userInfo.id) {
    throw unauthorizedError("Invalid Token information!");
  }

  res.locals.user = user;

  next();
}
