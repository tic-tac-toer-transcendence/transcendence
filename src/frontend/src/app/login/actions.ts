"use server"
import { LoginFormState } from "./form"

export default async function handleLoginForm(prevState: LoginFormState, formData: FormData) {
  const newState: LoginFormState = {
    email: formData.get("email")?.toString() || prevState.email,
    emailError: "",
    password: formData.get("password")?.toString() || prevState.password,
    passwordError: "",
  }

  return newState
}
