"use server"

import { CreateUserState } from "./form";
import { z } from "zod" 
import { redirect } from "next/navigation"

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
  let error = false;
  const formValidation = registerSchema.safeParse({
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
      error = true;
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
    case "X": newState.gender = "X"; break;
    case "O": newState.gender = "O"; break;
    default:
      newState.gender = undefined;
      newState.genderError = "Please select a symbol"
      error = true;
  }

  if (error)
    return (newState);

  const res = await fetch("http://backend:8080/register", {
    method: "POST",
    body: JSON.stringify({
      "email": newState.email,
      "password": newState.password,
      "username": newState.username,
      "symbol": newState.gender
    })
  })

  if (res.ok) {
    redirect("/login")
  }

  newState.genderError = await res.text();

  return newState;
}
