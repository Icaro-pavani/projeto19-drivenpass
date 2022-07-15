import Joi from "joi";
import { CreateCredentialData } from "../repositories/credentialRepository.js";

export type ValidCreateCredentialData = Omit<CreateCredentialData, "userId">;

const credentialSchema = Joi.object<ValidCreateCredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default credentialSchema;
