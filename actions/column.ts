"use server"

import { db } from "@/lib/db"
import { NewColumnSchema } from "@/schemas"
import * as z from "zod"

export const createNewColumnAction = async (values: z.infer<typeof NewColumnSchema>) => {
  const validatedFields = NewColumnSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: "Invalid fields"}
  }
  
  const { title, order } = validatedFields.data


  const column = await db.column.create({data: {title, order: order || 0}, include: {tasks: true}})
  return column
}