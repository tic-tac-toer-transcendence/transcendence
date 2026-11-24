import { Gender } from "./gender";
import { FieldState } from "./field";

export type BoardState = {
  turn: Gender | null;
  player: Gender | null;
  board: FieldState[];
  status: "waiting" | "playing" | "finished";
}
