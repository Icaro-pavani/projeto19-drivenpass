import { Notes } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateNoteData = Omit<Notes, "id">;

export async function insert(note: CreateNoteData) {
  await prisma.notes.create({ data: note });
}

export async function findByUserIdAndTitle(userId: number, title: string) {
  return prisma.notes.findFirst({ where: { userId, title } });
}

export async function findById(id: number) {
  return prisma.notes.findFirst({ where: { id } });
}

export async function findAllByUserId(userId: number) {
  return prisma.notes.findMany({ where: { userId } });
}

export async function deleteById(id: number) {
  return prisma.notes.delete({ where: { id } });
}
