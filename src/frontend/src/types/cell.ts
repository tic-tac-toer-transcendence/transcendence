import { Gender } from "./gender"

export type CellState = {
  id: number,
  fieldId: number,
  claimed: Gender | null
}
