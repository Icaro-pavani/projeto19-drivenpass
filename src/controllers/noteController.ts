import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { ValidCreateNoteData } from "../schemas/noteSchema.js";
import * as noteServices from "../services/noteServices.js";

export async function addNote(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const noteInfo: ValidCreateNoteData = res.locals.body;

  await noteServices.addNewNote(noteInfo, user.id);

  res.sendStatus(201);
}
