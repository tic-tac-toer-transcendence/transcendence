import Cell, { CellState } from "@/components/board/cell"

export interface FieldState {
  active: boolean;
  claimed: "X" | "O" | null;
  cells: CellState[]
}

export default function Field({ state }: { state: FieldState }) {
  return (
    <ul className="max-w-md bg-button-bg border-2 rounded-xl border-button-border p-2 grid grid-rows-3 grid-cols-3 gap-1 w-full">
      {state.cells.map((state, i) => {
        return <Cell key={i} state={state} />
      })}
    </ul>
  )
}
