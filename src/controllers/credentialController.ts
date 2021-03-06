import { Users } from "@prisma/client";
import { Request, Response } from "express";

import { ValidCreateCredentialData } from "../schemas/credentialSchema.js";
import * as crendentialService from "../services/credentialService.js";

export async function addCredential(req: Request, res: Response) {
  const credentialData: ValidCreateCredentialData = res.locals.body;
  const user: Users = res.locals.user;

  await crendentialService.addNewCredential(credentialData, user.id);

  res.sendStatus(201);
}

export async function getUserCredentials(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const credentials = await crendentialService.obtainAllUserCredentials(
    user.id
  );

  res.status(200).send(credentials);
}

export async function getCredential(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const credentialId: number = parseInt(req.params.id);

  const credential = await crendentialService.getCredentialById(
    credentialId,
    userId
  );

  res.status(200).send(credential);
}

export async function deleteOneCredential(req: Request, res: Response) {
  const { id: userId }: { id: number } = res.locals.user;
  const credentialId: number = parseInt(req.params.id);

  await crendentialService.deleteCredential(credentialId, userId);

  res.sendStatus(200);
}
