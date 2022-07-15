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
