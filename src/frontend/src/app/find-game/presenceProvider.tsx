"use client"

import { ReactNode, useEffect, useRef } from "react"

export default function PresenceProvider({ children }: { children: ReactNode}) {
  const wsRef = useRef<WebSocket | null>(null);

  function presenceConnect() {
    const ws = new WebSocket("wss://localhost/api/ws/presence");
    
    ws.onopen = function() {
      console.log("Connected to presence websocket");
    }

    ws.onmessage = function(e) {
      console.log(`Presence: ${e.data}`);
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
    <>
      {children}
    </>

  )
}
