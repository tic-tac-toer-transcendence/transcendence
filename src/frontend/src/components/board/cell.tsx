import XIcon from "@/components/icons/xIcon"
import OIcon from "@/components/icons/oIcon"

export interface CellState {
  cellKey: number,
  fieldKey: number,
  claimed: "X" | "O" | null
}

export default function Cell({ state }: { state: CellState }) {
  return (
    <li className="bg-section-bg border border-button-border w-full h-0 pb-[calc(100%-2px)] relative">
      <button className={`absolute p-2 ${state.claimed === "X" ? "fill-x-green": state.claimed === "O" ? "fill-o-purple" : ""}`}>
      {state.claimed === "X" && <XIcon className="drop-shadow-[0_0_6px] drop-shadow-x-green" />}
      {state.claimed === "O" && <OIcon className="drop-shadow-[0_0_6px] drop-shadow-o-purple" />}
      </button>
    </li>
  )
}
