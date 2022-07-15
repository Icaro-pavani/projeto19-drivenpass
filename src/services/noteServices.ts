import { unauthorizedError } from "../middlewares/handleErrorsMiddleware.js";
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
