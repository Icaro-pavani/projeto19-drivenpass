import { Router } from "express";
import { addCard, getUserCards } from "../controllers/cardController.js";
import validSchema from "../middlewares/validSchema.js";
import validToken from "../middlewares/validToken.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/cards/create", validToken, validSchema(cardSchema), addCard);
cardRouter.get("/cards", validToken, getUserCards);

export default cardRouter;
