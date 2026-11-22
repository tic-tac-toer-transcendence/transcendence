"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getGameState,
  sendMove,
} from "./gameStore";

export function useGameState() {
  return useSyncExternalStore(
    subscribe,
    getGameState,
    getGameState
  );
}

export function useSendMove() {
  return sendMove;
}
