import { Documents } from "@prisma/client";

import {
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import repositories from "../repositories/repositories.js";
import { ValidCreateDocumentData } from "../schemas/documentSchema.js";

const repositoryTable = "documents";
const documentRepository = repositories<Documents>(repositoryTable);

export async function addNewDocument(
  documentInfo: ValidCreateDocumentData,
  userId: number
) {
  const registeredDocument = await documentRepository.findByUserIdAndTitle(
    userId,
    documentInfo.title
  );

  if (!!registeredDocument) {
    throw unauthorizedError("The user already has a document with this title!");
  }

  const documentData = { ...documentInfo, userId };
  await documentRepository.insert(documentData);
}

export async function obtainAllUserDocuments(userId: number) {
  const documentsResult = await documentRepository.findAllByUserId(userId);
  const documents = documentsResult.map((document: Documents) => {
    delete document.userId;
    return document;
  });
  return documents;
}

export async function getDocumentById(documentId: number, userId: number) {
  if (!documentId) {
    throw unprocessableError("The id must be an integer number!");
  }

  const document = await validNoteByUser(documentId, userId);

  delete document.userId;
  return document;
}

export async function deleteDocument(documentId: number, userId: number) {
  if (!documentId) {
    throw unprocessableError("The id must be an integer number!");
  }

  await validNoteByUser(documentId, userId);

  await documentRepository.deleteById(documentId);
}

async function validNoteByUser(documentId: number, userId: number) {
  const document = await documentRepository.findById(documentId);
  if (!document) {
    throw unprocessableError("There is not a document for this id!");
  }

  if (document.userId !== userId) {
    throw unauthorizedError("This document belongs to another user!");
  }

  return document;
}
