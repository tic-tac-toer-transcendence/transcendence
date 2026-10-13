"use server"
import { CreateUserState } from "./form";
import { z } from "zod" 

const schema = z.object({
  email: z.email("Invalid Email"),
})

export default async function createUserAction(prevState: CreateUserState, formData: FormData) {
  console.log(formData);

  const  validatedFields = schema.safeParse({
    email: formData.get("email")
  })
  
  const newState: CreateUserState = {
    email: formData.get("email")?.toString() || prevState.email,
    emailError: !validatedFields.success ? validatedFields.error.issues.pop.toString() : "",
    password: formData.get("password")?.toString() || prevState.password,
    passwordError: "",
    username: formData.get("username")?.toString() || prevState.email,
    usernameError: "",
    gender: prevState.gender
  }
  
  const genderStr = formData.get("gender")?.toString();
  switch (genderStr) {
    case "x": newState.gender = "x"; break;
    case "o": newState.gender = "o"; break;
    default: newState.gender = undefined;
  }

  return newState;
}
