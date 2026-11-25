"use client"

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, createContext, useState } from "react"

type PresenceMessage =
| { type: "game_invite", fromUser: string, username: string }
| { type: "game_start", gameId: string }


export const InviteContext = createContext({
  username: "",
  id: ""
});


export default function PresenceProvider({ children }: { children: ReactNode}) {
  const wsRef = useRef<WebSocket | null>(null);
  const router = useRouter();
  const [invite, setInvite] = useState({username: "", id: ""});

  function handleMessage(message: PresenceMessage) {
    switch(message.type) {
      case("game_invite"): {
        setInvite({...invite,
          username: message.username,
          id: message.fromUser,
        })
        break ;
      }
      case("game_start"): {
        router.push(`/game?gameId=${message.gameId}`);
      }
    }
  }

  function presenceConnect() {
    const ws = new WebSocket("wss://localhost/api/ws/presence");
    
    ws.onopen = function() {
      console.log("Connected to presence websocket");
    }

    ws.onmessage = function(e) {
      console.log(`Presence: ${e.data}`);
      const message: PresenceMessage = JSON.parse(e.data);
      handleMessage(message);
    }

    ws.onclose = function() {
      console.log("Disconnected from presence websocket, reconnecting...")
      setTimeout(() => {
        presenceConnect()
      }, 1000)
    }

    wsRef.current = ws;
  }

  useEffect(() => {
    presenceConnect();
    return (() => {
      if (wsRef.current) {
        wsRef.current.onclose = function() {
          console.log("Disconnected from presence websocket");
        }
        wsRef.current.close();
      }
    })

  }, [])

  return (
    <InviteContext.Provider value={invite}>
      {children}
    </InviteContext.Provider>
  )
}
