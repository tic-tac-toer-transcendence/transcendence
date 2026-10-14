"use server"
import { CreateUserState } from "./form";
import { z } from "zod" 

const passwordSchema = z.string()
  .min(6, {message: "Password must be at least 6 characters long"})
  .max(72, {message: "Password must be at most 72 characters long"})
  .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
  .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
  .regex(/[0-9]/, {message: "Password must contain at least one number"})
  .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one special character"})

const registerSchema = z.object({
  email: z.email("Invalid Email"),
  password: passwordSchema,
})

export default async function createUserAction(prevState: CreateUserState, formData: FormData) {
  console.log(formData);

  const  formValidation = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  })

  const emailIssues: z.core.$ZodIssue[] = []
  const passwordIssues: z.core.$ZodIssue[] = []

  if (!formValidation.success) {
    formValidation.error.issues.forEach(issue => {
      if (issue.path[0] == "email")
        emailIssues.push(issue);
      if (issue.path[0] == "password")
        passwordIssues.push(issue);
    })
  }
  
  const newState: CreateUserState = {
    email: formData.get("email")?.toString() || prevState.email,
    emailError: emailIssues.length ? emailIssues[0].message : "",
    password: formData.get("password")?.toString() || prevState.password,
    passwordError: passwordIssues.length ? passwordIssues[0].message : "",
    username: formData.get("username")?.toString() || prevState.email,
    usernameError: "",
    gender: prevState.gender,
    genderError: ""
  }
  
  const genderStr = formData.get("gender")?.toString();
  switch (genderStr) {
    case "x": newState.gender = "x"; break;
    case "o": newState.gender = "o"; break;
    default:
      newState.gender = undefined;
      newState.genderError = "Please select a symbol"
  }

  return newState;
}
