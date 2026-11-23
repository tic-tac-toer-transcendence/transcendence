import { BoardState } from "@/types/board";
import { FieldState } from "@/types/field";
import { GameServerMessage } from "@/types/gameMessages";

function checkFieldClaimed(field: FieldState, message: GameServerMessage) {
  if (message.type !== "move")
    return (null);
  const tmpField = {...field};
  tmpField.cells[message.cell].claimed = message.player;

  if (tmpField.cells[0].claimed
    && ((tmpField.cells[0].claimed === tmpField.cells[1].claimed && tmpField.cells[0].claimed === tmpField.cells[2].claimed)
    || (tmpField.cells[0].claimed === tmpField.cells[3].claimed && tmpField.cells[0].claimed === tmpField.cells[6].claimed)
    || (tmpField.cells[0].claimed === tmpField.cells[4].claimed && tmpField.cells[0].claimed === tmpField.cells[8].claimed)))
    return (tmpField.cells[0].claimed);

  if (tmpField.cells[1].claimed
    && (tmpField.cells[1].claimed === tmpField.cells[4].claimed && tmpField.cells[1].claimed === tmpField.cells[7].claimed))
    return (tmpField.cells[1].claimed);

  if (tmpField.cells[2].claimed
    && ((tmpField.cells[2].claimed === tmpField.cells[4].claimed && tmpField.cells[2].claimed === tmpField.cells[6].claimed)
    || (tmpField.cells[2].claimed === tmpField.cells[5].claimed && tmpField.cells[2].claimed === tmpField.cells[8].claimed)))
    return (tmpField.cells[2].claimed);

  if (tmpField.cells[3].claimed
    && (tmpField.cells[3].claimed === tmpField.cells[4].claimed && tmpField.cells[3].claimed === tmpField.cells[5].claimed))
    return (tmpField.cells[3].claimed);
  
  if (tmpField.cells[6].claimed
    && (tmpField.cells[6].claimed === tmpField.cells[7].claimed && tmpField.cells[6].claimed === tmpField.cells[8].claimed))
    return (tmpField.cells[6].claimed);
  return (null)

}

function checkFieldFull(field: FieldState) {
  return (!!field.cells[0].claimed && !!field.cells[1].claimed && !!field.cells[2].claimed
    && !!field.cells[3].claimed && !!field.cells[4].claimed && !!field.cells[5].claimed
    && !!field.cells[6].claimed && !!field.cells[7].claimed && !!field.cells[8].claimed)
}

export function moveStateUpdate(state: BoardState, message: GameServerMessage) {
  if (message.type !== "move")
    return {...state};

  const newState = {...state};
  newState.turn = message.player === "X" ? "O" : "X";

  const messageFieldClaimed = checkFieldClaimed(state.board[message.field], message);
  const messageFieldFull = checkFieldFull(state.board[message.field]);
  const nextFieldClaimed = state.board[message.cell].claimed;
  const nextFieldFull = checkFieldFull(state.board[message.cell]);

  newState.board = state.board.map((field, fieldId) => {
    if (fieldId === message.field)
      return ({...field,
        active: (!messageFieldClaimed && !messageFieldFull && fieldId === message.cell) ? newState.turn : null,
        claimed: messageFieldClaimed,
        cells: field.cells.map((cell, cellid) => {
          if (cellid === message.cell)
            return ({...cell,
              claimed: message.player
            })
          return ({...cell});
        })

      })
    if ((nextFieldFull || nextFieldClaimed))
      return ({...field,
        active: (!field.claimed && !checkFieldFull(field)) ? newState.turn : null,
      })
    return ({...field,
      active: (!field.claimed && !checkFieldFull(field) && fieldId === message.cell) ? newState.turn : null,
    });
  })

  return newState;
}
