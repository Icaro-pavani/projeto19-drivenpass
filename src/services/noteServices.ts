import { Notes } from "@prisma/client";
import {
  unauthorizedError,
  unprocessableError,
} from "../middlewares/handleErrorsMiddleware.js";
import * as noteRepository from "../repositories/noteRepository.js";
import { ValidCreateNoteData } from "../schemas/noteSchema.js";

export async function addNewNote(
  noteInfo: ValidCreateNoteData,
  userId: number
) {
  const registeredNote = await noteRepository.findByUserIdAndTitle(
    userId,
    noteInfo.title
  );

  if (!!registeredNote) {
    throw unauthorizedError("The user already has a note with this title!");
  }

  const noteData = { ...noteInfo, userId };

  await noteRepository.insert(noteData);
}

export async function obtainAllUserNotes(userId: number) {
  const notesResult = await noteRepository.findAllByUserId(userId);
  const notes = notesResult.map((note: Notes) => {
    delete note.userId;
    return note;
  });
  return notes;
}

export async function getNoteById(noteId: number, userId: number) {
  const note = await validNoteByUser(noteId, userId);

  delete note.userId;
  return note;
}

export async function deleteNote(noteId: number, userId: number) {
  await validNoteByUser(noteId, userId);

  await noteRepository.deleteById(noteId);
}

async function validNoteByUser(noteId: number, userId: number) {
  const note = await noteRepository.findById(noteId);
  if (!note) {
    throw unprocessableError("There is not a note for this id!");
  }

  if (note.userId !== userId) {
    throw unauthorizedError("This note belongs to another user!");
  }

  return note;
}
