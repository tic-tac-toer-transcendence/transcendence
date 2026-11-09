"use client";

import { createContext, useContext, useEffect, useRef } from "react";

const PresenceContext = createContext<WebSocket | null>(null);

export default function PresenceProvider({ children }: { children: React.ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);

  function presenceConnect() {
    const ws = new WebSocket("https://localhost/api/ws/presence");

    ws.onopen = function() {
      console.log("Connected to presence websocket");
    }

    ws.onmessage = function(e) {
      console.log(`Presence: ${e.data}`)
    }

    ws.onclose = function() {
      console.log(`Disconnected from presence websocket, reconnecting...`);
      setTimeout(() => {
        presenceConnect();
      })
    }

    wsRef.current = ws;
  }

  useEffect(() => {
    if (!wsRef.current) {
      presenceConnect();
    }
    return () => {
      if (wsRef.current)
        wsRef.current.close();
      wsRef.current = null;
    };
  }, []);

  return (
    <PresenceContext.Provider value={wsRef.current}>
      {children}
    </PresenceContext.Provider>
  );
}

export const usePresence = () => useContext(PresenceContext);
