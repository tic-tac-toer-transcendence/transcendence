import { BoardState } from "@/types/board";
import { FieldState } from "@/types/field";
import { GameServerMessage } from "@/types/gameMessages";

function checkFieldClaimed(field: FieldState, message: GameServerMessage) {
  if (message.type !== "move")
    return (null);
  const tmpField = {...field};

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

  newState.board[message.field].cells[message.cell].claimed = message.player;
  newState.board[message.field].claimed = checkFieldClaimed(newState.board[message.field], message);

  const nextFieldClaimed = state.board[message.cell].claimed;
  const nextFieldFull = checkFieldFull(state.board[message.cell]);

  newState.board = state.board.map((field, fieldId) => {
    if ((nextFieldFull || nextFieldClaimed))
      return ({...field,
        active: (!field.claimed && !checkFieldFull(field)) ? newState.turn : null,
      })
    return ({...field,
      active: (!field.claimed && !checkFieldFull(field) && fieldId === message.cell) ? newState.turn : null,
    });
  })

  return (newState);
}

export function gameOverUpdate(state: BoardState, message: GameServerMessage) {
  if (message.type !== "game_over")
    return ({...state});

  const newState = {...state};

  newState.status = "finished";
  newState.board = newState.board.map((field) => {
    return ({...field,
      active: null,
    })
  })

  if (newState.board[0].claimed === message.winner
    && (newState.board[0].claimed === newState.board[1].claimed && newState.board[0].claimed === newState.board[2].claimed)) {
    newState.board[0].active = message.winner;
    newState.board[1].active = message.winner;
    newState.board[2].active = message.winner;
  }

  if (newState.board[0].claimed === message.winner
    && (newState.board[0].claimed === newState.board[3].claimed && newState.board[0].claimed === newState.board[6].claimed)) {
    newState.board[0].active = message.winner;
    newState.board[3].active = message.winner;
    newState.board[6].active = message.winner;
  }

  if (newState.board[0].claimed === message.winner
    && (newState.board[0].claimed === newState.board[4].claimed && newState.board[0].claimed === newState.board[8].claimed)) {
    newState.board[0].active = message.winner;
    newState.board[4].active = message.winner;
    newState.board[8].active = message.winner;
  }

  if (newState.board[1].claimed === message.winner
    && (newState.board[1].claimed === newState.board[4].claimed && newState.board[1].claimed === newState.board[7].claimed)) {
    newState.board[1].active = message.winner;
    newState.board[4].active = message.winner;
    newState.board[7].active = message.winner;
  }

  if (newState.board[2].claimed === message.winner
    && (newState.board[2].claimed === newState.board[5].claimed && newState.board[2].claimed === newState.board[8].claimed)) {
    newState.board[2].active = message.winner;
    newState.board[5].active = message.winner;
    newState.board[8].active = message.winner;
  }

  if (newState.board[2].claimed === message.winner
    && (newState.board[2].claimed === newState.board[4].claimed && newState.board[2].claimed === newState.board[6].claimed)) {
    newState.board[2].active = message.winner;
    newState.board[4].active = message.winner;
    newState.board[6].active = message.winner;
  }

  if (newState.board[3].claimed === message.winner
    && (newState.board[3].claimed === newState.board[4].claimed && newState.board[3].claimed === newState.board[5].claimed)) {
    newState.board[3].active = message.winner;
    newState.board[4].active = message.winner;
    newState.board[5].active = message.winner;
  }

  if (newState.board[6].claimed === message.winner
    && (newState.board[6].claimed === newState.board[7].claimed && newState.board[6].claimed === newState.board[8].claimed)) {
    newState.board[6].active = message.winner;
    newState.board[7].active = message.winner;
    newState.board[8].active = message.winner;
  }

  return (newState);
}
