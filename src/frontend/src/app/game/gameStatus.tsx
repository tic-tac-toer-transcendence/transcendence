"use client"

import { useGameState } from "./hooks";

export default function GameStatus() {
  const boardState = useGameState();

  if (boardState.status === "waiting") {
    return (
      <div className="bg-section-bg border-2 border-section-border rounded-2xl p-6">
        <h2 className="font-bold text-sm uppercase">Match</h2>
        Waiting for other player...
      </div>
    )
  }

  return (
    <div>
      {boardState.turn}
      Your turn
    </div>
  )
}
