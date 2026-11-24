"use client"

import Field from "@/components/board/field";
import { useGameState, useSendMove } from "@/app/game/hooks";
import { CellState } from "@/types/cell";
import DisplayBoard from "./displayBoard";
import { initBoardState } from "./initBoardState";

export default function Board() {
  const boardState = useGameState();
  const sendMove = useSendMove();

  const isMyTurn = boardState.player && boardState.turn === boardState.player;

  function handleCellClick(cell: CellState) {
    if (
      boardState.status !== "playing"
      || !isMyTurn
      || boardState.board[cell.fieldId].cells[cell.id].claimed)
      return ;

    sendMove(cell);
  }

  if (boardState.status === "waiting") {
    return (
        <DisplayBoard state={initBoardState()} />
      );
  }

  return (
    <div className="bg-background rounded-2xl p-3 grid grid-rows-3 grid-cols-3 gap-3 w-full max-w-2xl">
      {boardState.board.map((state, i) => {
        return <Field key={i} state={state} handleCellClick={handleCellClick} />
      })}
    </div>
  )
}

