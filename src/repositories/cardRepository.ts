import { Cards } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateCardData = Omit<Cards, "id">;

export async function insert(card: CreateCardData) {
  await prisma.cards.create({ data: card });
}

export async function findByUserIdAndTitle(userId: number, title: string) {
  return prisma.cards.findFirst({ where: { userId, title } });
}

export async function findById(id: number) {
  return prisma.cards.findFirst({ where: { id } });
}

export async function findAllByUserId(userId: number) {
  return prisma.cards.findMany({ where: { userId } });
}

export async function deleteById(id: number) {
  return prisma.cards.delete({ where: { id } });
}
