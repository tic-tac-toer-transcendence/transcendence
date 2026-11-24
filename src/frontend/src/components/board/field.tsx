"use client"
import Cell from "@/components/board/cell"
import { FieldState } from "@/types/field";
import { CellState } from "@/types/cell";
import XIcon from "../icons/xIcon";
import OIcon from "../icons/oIcon";

interface FieldProps {
  state: FieldState,
  handleCellClick?(cell: CellState): void
}

export default function Field({ state, handleCellClick }: FieldProps) {
  if (state.claimed) {
    return (
      <div className = {`
        max-w-md
        bg-button-bg
        border-2 rounded-xl border-button-border
        p-2
        flex
        ${state.active === "X" && "border-x-green shadow-sidebar shadow-x-green"}
        ${state.active === "O" && "border-o-purple shadow-sidebar shadow-o-purple"}
      `}>
        {state.claimed === "X" &&
          <div className="bg-x-green-dim w-full flex justify-center">
            <XIcon className="max-w-14 fill-x-green" />
          </div>
        }
        {state.claimed === "O" &&
          <div className="bg-o-purple-dim w-full flex justify-center">
            <OIcon className="max-w-14 fill-o-purple" />
          </div>
        }
      </div>
    )
  }

  return (
    <ul className={`
      max-w-md
      bg-button-bg
      border-2 rounded-xl border-button-border
      p-2
      grid grid-rows-3 grid-cols-3 gap-1 w-full
      ${state.active && "shadow-sidebar"}
      ${state.active === "O" && "shadow-o-purple border-o-purple"}
      ${state.active === "X" && "shadow-x-green border-x-green"}
    `}>
      {state.cells.map((state, i) => {
        if (handleCellClick)
          return <Cell key={i} state={state} handleCellClick={handleCellClick}  />
        return <Cell key={i} state={state} />
      })}
    </ul>
  )
}
