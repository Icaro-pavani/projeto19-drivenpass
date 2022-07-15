import { Users } from "@prisma/client";
import { Request, Response } from "express";

import { ValidCreateCardData } from "../schemas/cardSchema.js";
import * as cardService from "../services/cardService.js";

export async function addCard(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const cardInfo: ValidCreateCardData = res.locals.body;

  await cardService.addNewCard(cardInfo, user.id);

  res.sendStatus(201);
}
