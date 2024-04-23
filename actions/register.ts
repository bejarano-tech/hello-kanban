"use server"

import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate data
  const validatedFields = RegisterSchema.safeParse(values)

  // Return error on invalid fields
  if (!validatedFields.success) {
    return { error: "Not valid fields" }
  }

  // Destructure fields from data
  const { email, password, name, lastname } = validatedFields.data

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: "User with that email already exists"}
  }

  await db.user.create({
    data: {
      name,
      lastname,
      email,
      password: hashedPassword
    }
  })

  // TODO: Add generate verification token and verification email

  return { success: "Success" }
}