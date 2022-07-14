import { Users } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateUserData = Omit<Users, "id">;

export async function insert(user: CreateUserData) {
  await prisma.users.create({ data: user });
}

export async function findByEmail(email: string) {
  return await prisma.users.findFirst({ where: { email } });
}
