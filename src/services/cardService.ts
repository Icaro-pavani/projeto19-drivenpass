import { Cards } from "@prisma/client";
import Cryptr from "cryptr";

import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { ValidCreateCardData } from "../schemas/cardSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

export async function addNewCard(
  cardInfo: ValidCreateCardData,
  userId: number
) {
  const registeredCard = await cardRepository.findByUserIdAndTitle(
    userId,
    cardInfo.title
  );
  if (!!registeredCard) {
    throw unauthorizedError("The user already has a card with this title!");
  }
  cardInfo.CVV = cryptr.encrypt(cardInfo.CVV);
  cardInfo.password = cryptr.encrypt(cardInfo.password);
  const cardData = { ...cardInfo, userId };
  await cardRepository.insert(cardData);
}

export async function obtainAllUserCards(userId: number) {
  const cardsResult = await cardRepository.findAllByUserId(userId);
  const cards = cardsResult.map((card: Cards) => {
    delete card.userId;
    card.CVV = cryptr.decrypt(card.CVV);
    card.password = cryptr.decrypt(card.password);
    return card;
  });
  return cards;
}
