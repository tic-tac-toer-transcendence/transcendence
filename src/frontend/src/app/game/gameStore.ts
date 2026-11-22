import { initBoardState } from "@/components/board/initBoardState";
import { BoardState } from "@/types/board"
import { CellState } from "@/types/cell";
import { GameServerMessage, GameClientMessage } from "@/types/gameMessages"

const initialState: BoardState = initBoardState();

let state = initialState;
let socket: WebSocket | null = null;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function updateState(newState: BoardState) {
  state = newState;
  notify();
}

function handleMessage(message: GameServerMessage) {
  switch(message.type) {
    case("joined"): {
      updateState({...state,
        player: message.you,
        turn: message.turn,
        status: "playing"
      });
      break ;
    }
    case("move"): {
      updateState({...state,
        turn: message.player === "X" ? "O" : "X",
        board: state.board.map((field, fieldId) => {
          if (fieldId === message.field)
            return ({...field,
              cells: field.cells.map((cell, cellid) => {
                if (cellid === message.cell)
                  return ({...cell,
                    claimed: message.player,
                  })
                return cell
              })
            })
          return field;
        })
      })
      break ;
    }
  }
}

export function connect(url: string) {
  const ws = new WebSocket(url);

  ws.onmessage = function(e) {
    console.log(e.data);
    const message: GameServerMessage = JSON.parse(e.data);
    handleMessage(message);
  }

  ws.onopen = function() {
    console.log("Connected to game websocket");
  }

  ws.onclose = function() {
    if (socket === ws)
      socket = null;
  }

  socket = ws;
}

export function disconnect() {
  const ws = socket;
  socket = null;
  ws?.close();
}

export function sendMessage(message: GameClientMessage) {
  if (socket?.readyState !== WebSocket.OPEN)
    return ;

  socket.send(JSON.stringify(message));
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return (() => listeners.delete(listener));
}

export function getGameState() {
  return state;
}

export function sendMove(cell: CellState) {
  sendMessage({
    type: "move",
    field: cell.fieldId,
    cell: cell.id,
  })
}
