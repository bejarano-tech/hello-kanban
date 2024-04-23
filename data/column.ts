import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ColumnWithTasks = Prisma.ColumnGetPayload<{
  include: { tasks: true }
}>

export const getColumns = async () => {
  try {
    const columns = await db.column.findMany({ include: { tasks: true } })
    return columns as ColumnWithTasks[]
  } catch {
    return null
  }
}
