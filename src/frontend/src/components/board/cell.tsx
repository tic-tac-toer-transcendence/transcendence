import XIcon from "@/components/icons/xIcon"
import OIcon from "@/components/icons/oIcon"
import { CellState } from "@/types/cell"

interface CellProps {
  state: CellState,
  handleCellClick?(cell: CellState): void
}

export default function Cell({ state, handleCellClick }: CellProps) {

  function handleClick() {
    if (handleCellClick)
      handleCellClick(state);
  }

  return (
    <li className="bg-section-bg border border-button-border min-w-9 w-full h-0 pb-[calc(100%-2px)] relative">
      <button className={`absolute w-full h-full p-2 ${state.claimed === "X" ? "fill-x-green": state.claimed === "O" ? "fill-o-purple" : ""}`} onClick={() => {handleClick()}}>
      {state.claimed === "X" && <XIcon className="drop-shadow-[0_0_6px] drop-shadow-x-green" />}
      {state.claimed === "O" && <OIcon className="drop-shadow-[0_0_6px] drop-shadow-o-purple" />}
      </button>
    </li>
  )
}
