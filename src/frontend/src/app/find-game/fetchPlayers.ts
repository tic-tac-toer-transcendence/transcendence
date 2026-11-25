import { PlayerProfile } from "@/types/playerProfile";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import * as z from "zod";

type usersOnlineResponse =
| { online: PlayerProfile[] }
| { error: string }

const gender = z.enum(["X", "O"]);
const playerProfile = z.object({
  id: z.string(),
  username: z.string(),
  symbol: gender,
})
const schema = z.object({
  online: z.array(playerProfile),
})

export default async function fetchPlayers(filter: "all" | "requests" | "friends") {
  const store = await cookies();
  const res = await fetch("http://backend:8080/users/online", {
    headers: {
      Cookie: `${store.get("session")?.name}=${store.get("session")?.value}`
    }
  })

  const userIdCookie = store.get("id");
  const userId = userIdCookie?.value ? userIdCookie.value : "";
  const data: usersOnlineResponse = await res.json();

  if (res.status === 401)
    redirect("/login");

  const parsedData = schema.parse(data);
  return (parsedData.online.filter((player) => player.id !== userId).map((player) => {
    return ({
      id: player.id,
      username: player.username,
      gender: player.symbol
    } satisfies PlayerProfile);
  }))
}
