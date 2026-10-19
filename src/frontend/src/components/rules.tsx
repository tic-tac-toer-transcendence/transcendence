"use client"
import Board from "@/components/board/board" 
import { stepOneBoardState } from "@/components/board/presets"
import { useState } from "react";

export default function Rules() {
  const [step, setStep] = useState(1);

  return (
    <section className="h-screen bg-section-bg flex flex-col items-center py-24 px-20">
      <span className="font-bold text-x-green text-sm uppercase mb-2">Core mechanics</span>
      <h2 className="font-extrabold text-white text-4xl mb-12">How to play Ultimate Tic Tac Toe</h2>
      <div className="max-w-5xl w-full">
        <div className={`p-6 bg-button-bg border-2 border-button-border rounded-2xl flex justify-between items-center ${step !== 1 ? "hidden" : ""}`} >
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="p-2 w-9 h-9 bg-x-green-dim rounded-lg flex justify-center items-center">
                <span className="text-x-green font-black text-base">01</span>
              </div>
              <h3 className="capitalize text-white font-bold text-xl">Nested grids</h3>
            </div>
            <p className="text-xl">
              {`Each of the 9 squares on the big board contains a small 3x3 Tic Tac Toe board. The big board is the game's overall map, while each sub-board is a local battleground.`}
            </p>
          </div>
          <Board state={stepOneBoardState()}/>
        </div>
      </div>
    </section>
  )
}
