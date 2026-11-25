"use server"
import { cookies } from "next/headers"
import { LoginFormState } from "@/app/login/form"
import { redirect } from "next/navigation"
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";
import * as z from "zod"

const schema = z.object({
  id: z.string(),
  symbol: z.enum(["X", "O"]),
  username: z.string(),
})

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


  let maxAge = 0;
  let path = ""
  res.headers.getSetCookie().forEach((cookie) => {
    const parsedCookie = parseSetCookie(cookie);
    if (!parsedCookie)
      return ;
    if (parsedCookie.name === "session") {
      cookieStore.set({
        name: parsedCookie.name,
        value: parsedCookie.value,
        httpOnly: parsedCookie.httpOnly,
        path: parsedCookie.path,
        maxAge: parsedCookie.maxAge
      })
      maxAge = parsedCookie.maxAge ? parsedCookie.maxAge : 0;
      path = parsedCookie.path ? parsedCookie.path : "localhost/"

    }
  })

  const data = await res.json();
  const parsedData = schema.parse(data);
  console.log(parsedData)

  cookieStore.set({
    name: "username",
    value: parsedData.username,
    httpOnly: true,
    maxAge: maxAge,
    path: path
  })

  cookieStore.set({
    name: "id",
    value: parsedData.id,
    httpOnly: true,
    maxAge: maxAge,
    path: path
  })

  if (res.ok) {
    redirect("/");
  }

  return newState
}
