import Player from "@/app/find-game/player"

export default function PlayersList() {
  return (
    <ul className="flex flex-col gap-3 min-h-0 overflow-auto scrollbar-auto scrollbar-gutter-stable scrollbar-track-section-bg scrollbar-thumb-section-border">
      <Player name="Gridis" icon="X" friend="friend" />
      <Player name="CottonKiwiiiiiii" icon="X" friend="friend" />
    </ul>
  )
}
