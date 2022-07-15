import { Credentials } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateCredentialData = Omit<Credentials, "id">;

export async function insert(credentialInfo: CreateCredentialData) {
  await prisma.credentials.create({ data: credentialInfo });
}

export async function findByUserIdAndTitle(userId: number, title: string) {
  return prisma.credentials.findFirst({ where: { userId, title } });
}

export async function findById(id: number) {
  return prisma.credentials.findFirst({ where: { id } });
}

export async function findAllByUserId(userId: number) {
  return prisma.credentials.findMany({ where: { userId } });
}
