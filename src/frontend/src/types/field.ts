import { Gender } from "./gender"
import { CellState } from "./cell"

export type FieldState = {
  active: boolean,
  claimed: Gender | null,
  cells: CellState[]
}
