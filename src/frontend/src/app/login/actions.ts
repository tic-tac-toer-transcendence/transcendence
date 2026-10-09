"use server"
import { z } from "zod"
import { LoginFormState } from "./form"

const schema = z.object({
  email: z.email("Invalid Email"),
})

export default async function handleLoginForm(initialState: LoginFormState, formData: FormData) {
  console.log(formData)

  const validatedFields = schema.safeParse({
    email: formData.get("email")
  })
  
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const emailErrors = !validatedFields.success ? validatedFields.error.issues : [];

  const newState: LoginFormState = {
    email: email ? email : "",
    emailErrors: emailErrors,
    password: password ? password : "",
    passwordErrors: initialState.passwordErrors,
  }

  return newState
}
