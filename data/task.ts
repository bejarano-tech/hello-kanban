import { db } from "@/lib/db"

export const getTasks = async () => {
  try {
    const tasks = await db.task.findMany()
    return tasks
  } catch {
    return null
  }
}