import { Credentials } from "@prisma/client";
import Cryptr from "cryptr";

import {
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
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
    delete credential.userId;
    return credential;
  });
  return credentials;
}

export async function getCredentialById(credentialId: number, userId: number) {
  const credential = await validCredentialByUser(credentialId, userId);

  credential.password = cryptr.decrypt(credential.password);
  delete credential.userId;
  return credential;
}

export async function deleteCredential(credentialId: number, userId: number) {
  await validCredentialByUser(credentialId, userId);

  await credentialRepository.deleteById(credentialId);
}

async function validCredentialByUser(credentialId: number, userId: number) {
  const credential = await credentialRepository.findById(credentialId);
  if (!credential) {
    throw unprocessableError("There is not a credential for this id!");
  }

  if (credential.userId !== userId) {
    throw unauthorizedError("This credentials belongs to another user!");
  }

  return credential;
}
