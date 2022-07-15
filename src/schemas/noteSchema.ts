import Joi from "joi";
import { CreateNoteData } from "../repositories/noteRepository";

export type ValidCreateNoteData = Omit<CreateNoteData, "userId">;

const noteSchema = Joi.object<ValidCreateNoteData>({
  title: Joi.string().max(50).required(),
  description: Joi.string().max(1000).required(),
});

export default noteSchema;
