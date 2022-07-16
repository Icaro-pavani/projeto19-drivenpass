import { Cards } from "@prisma/client";
import Joi from "joi";

export type ValidCreateCardData = Omit<Cards, "id" | "userId">;

const cardSchema = Joi.object<ValidCreateCardData>({
  title: Joi.string().required(),
  cardNumber: Joi.string()
    .pattern(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/)
    .required(),
  cardholderName: Joi.string().required(),
  CVV: Joi.string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  expirationDate: Joi.string()
    .pattern(/^(0[0-9]|1[0-2])\/([0-9]{2})$/)
    .required(),
  password: Joi.string().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().valid("credit", "debit", "both"),
});

export default cardSchema;
