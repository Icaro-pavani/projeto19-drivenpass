import { prisma } from "../config/database.js";

export default function repositories<Type>(table: string) {
  type CreateType = Omit<Type, "id">;
  async function insert(CreateData: CreateType) {
    await prisma[table].create({ data: CreateData });
  }

  async function findByUserIdAndTitle(
    userId: number,
    title: string
  ): Promise<Type> {
    return prisma[table]<Type>.findFirst({ where: { userId, title } });
  }

  async function findById(id: number): Promise<Type> {
    return prisma[table].findFirst({ where: { id } });
  }

  async function findAllByUserId(userId: number): Promise<Type[]> {
    return prisma[table].findMany({ where: { userId } });
  }

  async function deleteById(id: number): Promise<Type> {
    return prisma[table].delete({ where: { id } });
  }
  const repository = {
    insert,
    findAllByUserId,
    findById,
    findByUserIdAndTitle,
    deleteById,
  };
  return repository;
}
