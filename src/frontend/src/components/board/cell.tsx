import XIcon from "@/components/icons/xIcon"
import OIcon from "@/components/icons/oIcon"

export interface CellState {
  claimed: "X" | "O" | null
}

interface CellProps {
  state: CellState;
  key: number;
  fieldKey: number;
}

export default function Cell({state, key, fieldKey}: CellProps) {
  return (
    <li className="bg-section-bg border border-button-border w-full h-0 pb-[calc(100%-2px)] relative">
      <button className={`absolute p-2 ${state.claimed === "X" ? "fill-x-green": state.claimed === "O" ? "fill-o-purple" : ""}`}>
      {state.claimed === "X" && <XIcon styles="drop-shadow-[0_0_6px] drop-shadow-x-green" />}
      {state.claimed === "O" && <OIcon styles="drop-shadow-[0_0_6px] drop-shadow-o-purple" />}
      </button>
    </li>
  )
}
