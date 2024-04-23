import * as z from "zod"

export const RegisterSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required'
  }).email({
    message: 'Email is not valid'
  }),
  password: z.string().min(9, {
    message: "Password must be minimum of 9 characters"
  }),
  name: z.string().min(1, {
    message: "Name is required"
  }),
  lastname: z.string().min(1, {
    message: "Lastname is required"
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})

