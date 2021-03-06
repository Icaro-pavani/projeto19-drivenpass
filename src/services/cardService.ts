import { Cards } from "@prisma/client";
import Cryptr from "cryptr";

import {
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import repositories from "../repositories/repositories.js";
import { ValidCreateCardData } from "../schemas/cardSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

const repositoryTable = "cards";
const cardRepository = repositories<Cards>(repositoryTable);

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

export async function getCardById(cardId: number, userId: number) {
  if (!cardId) {
    throw unprocessableError("The id must be an integer number!");
  }

  const card = await validCardByUser(cardId, userId);

  delete card.userId;
  card.CVV = cryptr.decrypt(card.CVV);
  card.password = cryptr.decrypt(card.password);

  return card;
}

export async function deleteCard(cardId: number, userId: number) {
  if (!cardId) {
    throw unprocessableError("The id must be an integer number!");
  }

  await validCardByUser(cardId, userId);

  await cardRepository.deleteById(cardId);
}

async function validCardByUser(cardId: number, userId: number) {
  const card = await cardRepository.findById(cardId);
  if (!card) {
    throw unprocessableError("There is not a card for this id!");
  }

  if (card.userId !== userId) {
    throw unauthorizedError("This card belongs to another user!");
  }

  return card;
}
