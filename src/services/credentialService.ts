import { Credentials } from "@prisma/client";
import Cryptr from "cryptr";

import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
import * as credentialRepository from "../repositories/credentialRepository.js";
import { ValidCreateCredentialData } from "../schemas/credentialSchema.js";

const cryptr = new Cryptr(process.env.CRYPTRKEY);

export async function addNewCredential(
  credentialInfo: ValidCreateCredentialData,
  userId: number
) {
  const registeredCrendential = await credentialRepository.findByUserIdAndTitle(
    userId,
    credentialInfo.title
  );
  if (!!registeredCrendential) {
    throw unauthorizedError(
      "The user already has a crendential with this title!"
    );
  }
  credentialInfo.password = cryptr.encrypt(credentialInfo.password);
  const credentialData = { ...credentialInfo, userId };
  await credentialRepository.insert(credentialData);
}

export async function obtainAllUserCredentials(userId: number) {
  const credentialsResult = await credentialRepository.findAllByUserId(userId);
  const credentials = credentialsResult.map((credential: Credentials) => {
    credential.password = cryptr.decrypt(credential.password);
    return credential;
  });
  return credentials;
}
