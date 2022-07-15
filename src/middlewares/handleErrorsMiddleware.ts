import { NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  conflict: 409,
  unprocessable: 422,
};

export function conflictError(message: string) {
  return { type: "conflict", message: message || "" };
}

export function unprocessableError(message: string) {
  return { type: "unprocessable", message: message || "" };
}

export function unauthorizedError(message: string) {
  return { type: "unauthorized", message: message || "" };
}

export default async function handleErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type) {
    return res.status(serviceErrorToStatusCode[error.type]).send(error.message);
  }

  return res.sendStatus(500);
}
