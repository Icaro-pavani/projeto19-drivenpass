import Cryptr from "cryptr";

import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
import * as crendentialRepository from "../repositories/credentialRepository.js";
import { ValidCreateCredentialData } from "../schemas/credentialSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

export async function addNewCredential(
  credentialInfo: ValidCreateCredentialData,
  userId: number
) {
  const registeredCrendential =
    await crendentialRepository.findByUserIdAndTitle(
      userId,
      credentialInfo.title
    );
  if (!!registeredCrendential) {
    throw unauthorizedError(
      "The user already has a crendential with this title!"
    );
  }
  credentialInfo.password = cryptr.encrypt(credentialInfo.password);
  const crendentialData = { ...credentialInfo, userId };
  await crendentialRepository.insert(crendentialData);
}
