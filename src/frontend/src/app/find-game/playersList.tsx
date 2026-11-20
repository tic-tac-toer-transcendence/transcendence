"use server"
import Player from "@/app/find-game/player"

export default async function PlayersList({ filter }: { filter: "all" | "friends"}) {
  const data = await fetch("http://backend:8080/users/online", {
  })

  console.log(data.ok);

  return (
    <ul className="flex flex-col gap-3 min-h-0 overflow-auto scrollbar-auto scrollbar-gutter-stable scrollbar-track-section-bg scrollbar-thumb-section-border">
      <Player name="Gridis" icon="X" friend="friend" />
      <Player name="CottonKiwiiiiiii" icon="X" friend="none" />
    </ul>
  )
}
