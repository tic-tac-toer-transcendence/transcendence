"use server"

import { cookies } from "next/headers";

export default async function inviteAction(formData: FormData) {
  const store = await cookies();
  const res = await fetch(`http://backend:8080/invites`, {
    method: "POST",
    headers: {
      Cookie: `${store.get("session")?.name}=${store.get("session")?.value}`
    },
    body: JSON.stringify({
      to: formData.get("id"),
    })
  })

  const data = await res.json();
  console.log(data);


}
