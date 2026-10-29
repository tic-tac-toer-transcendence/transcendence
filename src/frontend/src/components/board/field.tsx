import Cell, { CellState } from "@/components/board/cell"
import { ActionDispatch } from "react";
import { BoardAction } from "@/components/board/board";

export interface FieldState {
  active: boolean;
  claimed: "X" | "O" | null;
  cells: CellState[]
}

export default function Field({ state, dispatch }: { state: FieldState, dispatch: ActionDispatch<[action: BoardAction]> }) {
  return (
    <ul className="max-w-md bg-button-bg border-2 rounded-xl border-button-border p-2 grid grid-rows-3 grid-cols-3 gap-1 w-full">
      {state.cells.map((state, i) => {
        return <Cell key={i} state={state} dispatch={dispatch} />
      })}
    </ul>
  )
}
