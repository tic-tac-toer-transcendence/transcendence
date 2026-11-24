import { Gender } from "./gender";

export type GameServerMessage =
| { type: "joined", turn: Gender, you: Gender}
| { type: "move", cell: number, field: number, player: Gender }
| { type: "game_over", winner: Gender, reason?: string }

export type GameClientMessage = {
  type: "move", field: number, cell: number
}
