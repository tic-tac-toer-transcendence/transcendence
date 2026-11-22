import Cell from "@/components/board/cell"
import { FieldState } from "@/types/field";
import { CellState } from "@/types/cell";

export default function Field({ state, handleCellClick }: { state: FieldState, handleCellClick(cell: CellState): void }) {
  return (
    <ul className="max-w-md bg-button-bg border-2 rounded-xl border-button-border p-2 grid grid-rows-3 grid-cols-3 gap-1 w-full">
      {state.cells.map((state, i) => {
        return <Cell key={i} state={state} handleCellClick={handleCellClick} />
      })}
    </ul>
  )
}
