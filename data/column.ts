import { db } from "@/lib/db"

export const getColumns = async () => {
  try {
    const columns = await db.column.findMany()
    return columns
  } catch {
    return null
  }
}