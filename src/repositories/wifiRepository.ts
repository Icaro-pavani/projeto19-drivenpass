import { Wifis } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateWifiData = Omit<Wifis, "id">;

export async function insert(wifi: CreateWifiData) {
  await prisma.wifis.create({ data: wifi });
}

export async function findByUserIdAndTitle(userId: number, title: string) {
  return prisma.wifis.findFirst({ where: { userId, title } });
}

export async function findById(id: number) {
  return prisma.wifis.findFirst({ where: { id } });
}

export async function findAllByUserId(userId: number) {
  return prisma.wifis.findMany({ where: { userId } });
}

export async function deleteById(id: number) {
  return prisma.wifis.delete({ where: { id } });
}
