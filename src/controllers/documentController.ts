import { Users } from "@prisma/client";
import { Request, Response } from "express";

import { ValidCreateDocumentData } from "../schemas/documentSchema.js";
import * as documentService from "../services/documentService.js";

export async function addDocument(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const documentInfo: ValidCreateDocumentData = res.locals.body;

  await documentService.addNewDocument(documentInfo, user.id);

  res.sendStatus(201);
}

export async function getUserDocuments(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const documents = await documentService.obtainAllUserDocuments(user.id);

  res.status(200).send(documents);
}

export async function getDocument(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const documentId: number = parseInt(req.params.id);

  const document = await documentService.getDocumentById(documentId, user.id);

  res.status(200).send(document);
}

export async function deleteOneDocument(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const documentId: number = parseInt(req.params.id);

  await documentService.deleteDocument(documentId, user.id);

  res.sendStatus(200);
}
