import { Users } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

type TokenUser = Omit<Users, "password">;

export default async function validToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let userInfo: TokenUser;
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    if (!token) {
      return res.status(422).send("Missing token!");
    }

    const secretKey = process.env.JWT_KEY;
    userInfo = jwt.verify(token, secretKey) as TokenUser;

    if (!userInfo.email) {
      return res.status(401).send("Invalid Token Information!");
    }

    const user = await userRepository.findByEmail(userInfo.email);

    if (!user || user.id !== userInfo.id) {
      return res.status(401).send("Invalid Token Information!");
    }

    res.locals.user = user;
  } catch (error) {
    return res.status(401).send("Invalid Token Information!");
  }

  next();
}
