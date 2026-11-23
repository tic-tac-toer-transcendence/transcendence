"use client"
import Cell from "@/components/board/cell"
import { FieldState } from "@/types/field";
import { CellState } from "@/types/cell";

interface FieldProps {
  state: FieldState,
  handleCellClick?(cell: CellState): void
}

export default function Field({ state, handleCellClick }: FieldProps) {
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
