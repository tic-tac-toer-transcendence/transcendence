"use client"

import Cell from "@/components/board/cell";
import { useGameState } from "./hooks";

export default function GameStatus() {
  const boardState = useGameState();

  if (boardState.status === "waiting") {
    return (
      <div className="bg-section-bg border-2 border-section-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="font-bold text-sm uppercase">
          Match
        </h2>
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-button-bg border-2 border-button-border rounded-xl flex items-center justify-between gap-3">
            <div className="flex gap-3 items-center">
              <ul className="w-9">
                <Cell state={{id: 0, fieldId: 0, claimed: boardState.player}}  />
              </ul>
              <span className="font-bold text-base text-white">You</span>
            </div>
            <span className="text-base">Waiting</span>
          </div>
          <div className="p-3 bg-button-bg border-2 border-button-border rounded-xl flex items-center justify-between gap-3">
            <div className="flex gap-3 items-center">
              <ul className="w-9">
                <Cell state={{id: 0, fieldId: 0, claimed: boardState.player}}  />
              </ul>
              <span className="font-bold text-base text-white">Opponent</span>
            </div>
            <span className="text-base">Waiting</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-section-bg border-2 border-section-border rounded-2xl p-6 flex flex-col gap-5">
      <h2 className="font-bold text-sm uppercase">
        Match
      </h2>
      <div className="flex flex-col gap-3">
        <div className={`
          p-3
          bg-button-bg
          border-2 border-button-border rounded-xl
          flex items-center justify-between gap-3
          ${boardState.status === "playing"
            ? boardState.turn === boardState.player
              ? boardState.turn === "X"
                ? "shadow-sidebar shadow-x-green border-x-green"
                : "shadow-sidebar shadow-o-purple border-o-purple"
              : ""
            : ""}
          ${boardState.status === "finished"
            ? boardState.turn !== boardState.player
              ? boardState.turn !== "X"
                ? "shadow-sidebar shadow-x-green border-x-green"
                : "shadow-sidebar shadow-o-purple border-o-purple"
              : ""
            : ""}
        `}>
          <div className="flex gap-3 items-center">
            <ul className="w-9">
              <Cell state={{id: 0, fieldId: 0, claimed: boardState.player}}  />
            </ul>
            <span className="font-bold text-base text-white">You</span>
          </div>
          <span className="text-base">
            {boardState.status === "playing" ? boardState.turn === boardState.player ? "Your turn": "Waiting" : ""}
            {boardState.status === "finished" ? boardState.turn === boardState.player ? "Loser": "Winner" : ""}
          </span>
        </div>
        <div className={`
          p-3
          bg-button-bg
          border-2 border-button-border rounded-xl
          flex items-center justify-between gap-3
          ${boardState.status === "playing"
            ? boardState.turn !== boardState.player
              ? boardState.turn === "X"
                ? "shadow-sidebar shadow-x-green border-x-green"
                : "shadow-sidebar shadow-o-purple border-o-purple"
              : ""
            : ""}
          ${boardState.status === "finished"
            ? boardState.turn === boardState.player
              ? boardState.turn !== "X"
                ? "shadow-sidebar shadow-x-green border-x-green"
                : "shadow-sidebar shadow-o-purple border-o-purple"
              : ""
            : ""}
        `}>
          <div className="flex gap-3 items-center">
            <ul className="w-9">
              <Cell state={{id: 0, fieldId: 0, claimed: boardState.player === "X" ? "O" : "X"}}  />
            </ul>
            <span className="font-bold text-base text-white">Opponent</span>
          </div>
          <span className="text-base">
            {boardState.status === "playing" ? boardState.turn !== boardState.player ? "Your turn": "Waiting" : ""}
            {boardState.status === "finished" ? boardState.turn !== boardState.player ? "Loser": "Winner" : ""}
          </span>
        </div>
      </div>
    </div>
  )
}
