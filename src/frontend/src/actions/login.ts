"use server"
import { cookies } from "next/headers"
import { LoginFormState } from "@/app/login/form"
import { redirect } from "next/navigation"
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

export default async function loginAction(prevState: LoginFormState, formData: FormData) {
  const cookieStore = await cookies();
  const newState: LoginFormState = {
    email: formData.get("email")?.toString() || prevState.email,
    emailError: "", password: formData.get("password")?.toString() || prevState.password,
    passwordError: "",
  }

  const res = await fetch(`http://backend:8080/login`, {
    method: "POST",
    body: JSON.stringify({
      "email": newState.email,
      "password": newState.password
    })
  })

  res.headers.getSetCookie().forEach((cookie) => {
    const parsedCookie = parseSetCookie(cookie);
    if (!parsedCookie)
      return ;
    cookieStore.set({
      name: parsedCookie.name,
      value: parsedCookie.value,
      httpOnly: parsedCookie.httpOnly,
      path: parsedCookie.path,
      maxAge: parsedCookie.maxAge
    })

  })

  if (res.ok) {
    redirect("/")
  }

  return newState
}
