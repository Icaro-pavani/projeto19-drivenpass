import { Notes } from "@prisma/client";
import Joi from "joi";

export type ValidCreateNoteData = Omit<Notes, "id" | "userId">;

const noteSchema = Joi.object<ValidCreateNoteData>({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(1000).required(),
});

export default noteSchema;
