import { Users } from "@prisma/client";
import { Request, Response } from "express";

import { ValidCreateCredentialData } from "../schemas/credentialSchema.js";
import * as crendentialRepository from "../services/credentialService.js";

export async function addCredential(req: Request, res: Response) {
  const credentialData: ValidCreateCredentialData = res.locals.body;
  const user: Users = res.locals.user;

  await crendentialRepository.addNewCredential(credentialData, user.id);

  res.sendStatus(201);
}
