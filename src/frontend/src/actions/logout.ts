"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function logOutAction() {
  const cookieStore = await cookies();
  const res = await fetch(`http://backend:8080/logout`, {
    method: "POST",
    headers: {
      Cookie: `${cookieStore.get("session")?.name}=${cookieStore.get("session")?.value}`
    }
  })

  if (res.ok)
    cookieStore.delete("session");
  redirect("/login");
}
