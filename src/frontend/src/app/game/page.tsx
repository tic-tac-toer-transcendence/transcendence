"use client"

import Board from "@/components/board/board";
import { useSearchParams } from "next/navigation";
import GameSocketProvider from "./wsProvider";
import GameStatus from "./gameStatus";

export default function Game() {
  const queryParams = useSearchParams();
  const gameId = queryParams.get("gameId");
  const opponent = queryParams.get("opponent");

  return (
    <main className="basis-full p-24 flex flex-col max-h-screen gap-12">
      <GameSocketProvider url={`wss://localhost/api/ws/game/${gameId}`}>
        <section className="p-6 bg-section-bg border-2 border-section-border rounded-2xl flex justify-between items-center">
          <h2 className="font-semibold text-sm uppercase">
            Playing against: 
            <span className="font-bold text-x-green ml-5 normal-case">
              {opponent}
            </span>
          </h2>
          <div className="flex gap-3">
            <button className="px-5 py-2 bg-button-bg border border-button-border rounded-lg font-bold text-sm">
              Offer Draw
            </button>
            <button className="px-5 py-2 bg-button-bg border border-button-border rounded-lg font-bold text-sm">
              Resign
            </button>
          </div>
        </section>
        <section className="flex gap-16 justify-between">
          <div className="p-8 bg-section-bg border-2 border-section-border rounded-3xl max-w-fit w-full grow">
            <Board />
          </div>
          <div className="grow flex flex-col">
            <GameStatus />
            <div>
              Match stats
            </div>
          </div>
        </section>
      </GameSocketProvider>
    </main>
  )
}
