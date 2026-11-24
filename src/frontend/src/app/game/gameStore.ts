import { initBoardState } from "@/components/board/initBoardState";
import { BoardState } from "@/types/board"
import { CellState } from "@/types/cell";
import { GameServerMessage, GameClientMessage } from "@/types/gameMessages"
import { gameOverUpdate, moveStateUpdate } from "./gameLogic";

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
        status: "playing",
        board: state.board.map((field) => {
          const active = message.you === message.turn ? message.you : null;
          return {...field,
            active: active,
          }
        })
      });
      break ;
    }
    case("move"): {
      updateState(moveStateUpdate(state, message));
      break ;
    }
    case("game_over"): {
      updateState(gameOverUpdate(state, message));
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
  state = initialState;
  ws?.close();
  console.log("Disconnected from game websocket");
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
