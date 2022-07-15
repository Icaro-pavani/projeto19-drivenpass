import { Notes } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateNoteData = Omit<Notes, "id">;

export async function insert(note: CreateNoteData) {
  await prisma.notes.create({ data: note });
}

export async function findByUserIdAndTitle(userId: number, title: string) {
  return prisma.notes.findFirst({ where: { userId, title } });
}
