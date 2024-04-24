"use server"

import { db } from "@/lib/db"
import { NewTaskSchema } from "@/schemas"
import * as z from "zod"

export const createNewTaskAction = async (taskData: z.infer<typeof NewTaskSchema>, columnId: string) => {
  const validatedFields = NewTaskSchema.safeParse(taskData)
  if (!validatedFields.success) {
    return { error: "Invalid fields"}
  }

  const existingTasks = await db.task.findMany({
    where: { columnId: columnId },
    orderBy: { order: 'desc' },
    take: 1
  });

  const nextOrder = existingTasks.length > 0 ? existingTasks[0].order + 1 : 0;

  const { name, description } = validatedFields.data
  const newTask = await db.task.create({
    data: {
      name: name,
      description: description,
      columnId: columnId,
      order: nextOrder
    }
  });
  return newTask
}

export const deleteTaskAction = (id: string) => {
  const deletedTask = db.task.delete({
    where: {
      id
    }
  })
  return deletedTask
}