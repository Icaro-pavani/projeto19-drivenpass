import { Credentials } from "@prisma/client";
import Joi from "joi";

export type ValidCreateCredentialData = Omit<Credentials, "id" | "userId">;

const credentialSchema = Joi.object<ValidCreateCredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default credentialSchema;
