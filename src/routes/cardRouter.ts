import { Router } from "express";
import {
  addCard,
  getCard,
  getUserCards,
} from "../controllers/cardController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards/create", validToken, validSchema(cardSchema), addCard);
cardRouter.get("/cards", validToken, getUserCards);
cardRouter.get("/cards/get/:id", validToken, getCard);

export default cardRouter;
