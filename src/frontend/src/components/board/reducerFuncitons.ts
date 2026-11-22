import { BoardState } from "@/types/board";


import { BoardAction } from "./board";
xport function claimCell(state: BoardState, action: BoardAction) {
  if (action.type !== "claimCell")
    return {...state};
  return ({...state, 
    board: state.board.map((field, index) => {
      if (index === action.value.fieldId) {
        return ({...field, cells: field.cells.map((cell, index) => {
          if (index === action.value.cellId)
            return ({...cell, claimed: state.turn})
          return cell;
        })})
      }
      return field;
    }),
    turn: state.turn === "X" ? "O" : "X",
  })
}
