"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function botGameAction() {
  const store = await cookies();
  const res = await fetch("http://backend:8080/games/bot", {
    method: "POST",
    headers: {
      Cookie: `${store.get("session")?.name}=${store.get("session")?.value}`
    }

  })

  console.log(res.status);

  if (res.ok) {
    redirect("/game");
  }

}
