"use client"
import Board from "@/components/board/board" 
import { stepOneBoardState } from "@/components/board/presets"
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "./icons/arrows";

export default function Rules() {
  const [step, setStep] = useState(1);

  function handlePrev() {
    if (step > 1)
      setStep(step - 1) }

  function handleNext() {
    if (step < 5)
      setStep(step + 1)
  }

  return (
    <section className="h-screen bg-section-bg flex flex-col items-center py-24 px-20" id="rules">
      <span className="font-bold text-x-green text-sm uppercase mb-2">Core mechanics</span>
      <h2 className="font-extrabold text-white text-4xl mb-12">How to play Ultimate Tic Tac Toe</h2>
      <div className="max-w-5xl w-full mb-4">
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
        <div className={`p-6 bg-button-bg border-2 border-button-border rounded-2xl flex justify-between items-center ${step !== 2 ? "hidden" : ""}`} >
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="p-2 w-9 h-9 bg-o-purple-dim rounded-lg flex justify-center items-center">
                <span className="text-o-purple font-black text-base">02</span>
              </div>
              <h3 className="capitalize text-white font-bold text-xl">Moves</h3>
            </div>
            <p className="text-xl">
              {`Your opponent's previous move determines which sub-board you are allowed to play in next. If your opponent places an X in the top-left square of middle-left board, you must place your O in any empty square of top-left board.`}
            </p>
          </div>
          <Board state={stepOneBoardState()}/>
        </div>
        <div className={`p-6 bg-button-bg border-2 border-button-border rounded-2xl flex justify-between items-center ${step !== 3 ? "hidden" : ""}`} >
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="p-2 w-9 h-9 bg-x-green-dim rounded-lg flex justify-center items-center">
                <span className="text-x-green font-black text-base">03</span>
              </div>
              <h3 className="capitalize text-white font-bold text-xl">Sub-board win</h3>
            </div>
            <p className="text-xl">
              {`Win three small squares in a row to claim that entire sub-board for your symbol (X or O). When a sub-board is won, the corresponding square on the big board is marked as claimed.`}
            </p>
          </div>
          <Board state={stepOneBoardState()}/>
        </div>
        <div className={`p-6 bg-button-bg border-2 border-button-border rounded-2xl flex justify-between items-center ${step !== 4 ? "hidden" : ""}`} >
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="p-2 w-9 h-9 bg-o-purple-dim rounded-lg flex justify-center items-center">
                <span className="text-o-purple font-black text-base">04</span>
              </div>
              <h3 className="capitalize text-white font-bold text-xl">Moves into filled sub-board</h3>
            </div>
            <p className="text-xl">
              {`If your opponent’s move placed you into a claimed or filled sub-board, you are allowed to play in any free space instead.`}
            </p>
          </div>
          <Board state={stepOneBoardState()}/>
        </div>
        <div className={`p-6 bg-button-bg border-2 border-button-border rounded-2xl flex justify-between items-center ${step !== 5 ? "hidden" : ""}`} >
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="p-2 w-9 h-9 bg-x-green-dim rounded-lg flex justify-center items-center">
                <span className="text-x-green font-black text-base">05</span>
              </div>
              <h3 className="capitalize text-white font-bold text-xl">Ultimate victory</h3>
            </div>
            <p className="text-xl">
              {`Claim three sub-boards in a row on the big board to win the entire game. This can happen horizontally, vertically, or diagonally across the big board.`}
            </p>
          </div>
          <Board state={stepOneBoardState()}/>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={handlePrev} className={`w-16 h-16 rounded-full border-2 bg-button-bg border-button-border cursor-pointer flex justify-center items-center
          fill-button-border ${step !== 1 ? "hover:fill-x-green hover:border-x-green": ""}`}>
          <ArrowLeft className="w-5/8 h-5/8"/>
        </button>
        <button onClick={handleNext} className={`w-16 h-16 rounded-full border-2 bg-button-bg border-button-border cursor-pointer flex justify-center items-center
          fill-button-border ${step !== 5 ? "hover:fill-x-green hover:border-x-green" : ""}`}>
          <ArrowRight className="w-5/8 h-5/8"/>
        </button>
      </div>
    </section>
  )
}
