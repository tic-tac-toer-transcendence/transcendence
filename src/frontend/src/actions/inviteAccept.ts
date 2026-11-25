"use server"

import { cookies } from "next/headers";

export default async function inviteAcceptAction(formData: FormData) {
  const store = await cookies();
  const res = await fetch(`http://backend:8080/invites/accept`, {
    method: "POST",
    headers: {
      Cookie: `${store.get("session")?.name}=${store.get("session")?.value}`
    }
  })
  
  const data = await res.json();
  console.log(res.status)
  console.log(data)

}
