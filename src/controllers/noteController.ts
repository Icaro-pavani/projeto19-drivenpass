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

export async function getUserNotes(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const notes = await noteServices.obtainAllUserNotes(user.id);

  res.status(200).send(notes);
}

export async function getNote(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const noteId: number = parseInt(req.params.id);

  const note = await noteServices.getNoteById(noteId, user.id);

  res.status(200).send(note);
}

export async function deleteOneNote(req: Request, res: Response) {
  const user: Users = res.locals.user;
  const noteId: number = parseInt(req.params.id);

  await noteServices.deleteNote(noteId, user.id);

  res.sendStatus(200);
}
