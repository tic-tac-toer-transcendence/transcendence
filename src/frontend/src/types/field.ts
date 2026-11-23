import { Gender } from "./gender"
import { CellState } from "./cell"

export type FieldState = {
  active: Gender | null,
  claimed: Gender | null,
  cells: CellState[]
}
