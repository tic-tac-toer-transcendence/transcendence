"use client";

import { createContext, useContext, useEffect, useRef } from "react";

export interface User {
  ws: WebSocket | null;
  loggedIn: boolean;
  id: string | null;
}

const PresenceContext = createContext<User>({
  ws: null,
  loggedIn: false,
  id: null
});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const userRef = useRef<User>({
    ws: null,
    loggedIn: false,
    id: null
  });

  function presenceConnect() {
    if (!userRef.current.loggedIn)
      return ;
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

    userRef.current.ws = ws;
  }

  useEffect(() => {
    if (!userRef.current) {
      presenceConnect();
    }
    return () => {
      if (userRef.current.ws)
        userRef.current.ws.close();
      userRef.current = {
        ws: null,
        loggedIn: false,
        id: null
      };
    };
  }, []);

  return (
    <PresenceContext.Provider value={userRef.current}>
      {children}
    </PresenceContext.Provider>
  );
}

export const usePresence = () => useContext(PresenceContext);
