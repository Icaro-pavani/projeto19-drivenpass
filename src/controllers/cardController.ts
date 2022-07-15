import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { request } from "http";

import { ValidCreateCardData } from "../schemas/cardSchema.js";
import * as cardService from "../services/cardService.js";

export async function addCard(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const cardInfo: ValidCreateCardData = res.locals.body;

  await cardService.addNewCard(cardInfo, user.id);

  res.sendStatus(201);
}

export async function getUserCards(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const cards = await cardService.obtainAllUserCards(user.id);

  res.status(200).send(cards);
}
