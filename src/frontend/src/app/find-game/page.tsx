"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import PlayersList from "./playersList"

export default function FindGame() {
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
    <main className="basis-full p-12 flex flex-col gap-12 max-h-screen">
      <div className="border-section-border border-2 bg-section-bg p-6 rounded-3xl">
        <h1 className="font-black text-4xl text-white">Find game</h1>
        <p className="text-base">Add friends from the list of online players or challenge online friends</p>
      </div>
      <section className="flex gap-8 min-h-0">
        <div className="grow basis-0 border-section-border border-2 bg-section-bg p-8 rounded-3xl flex flex-col gap-6">
          <h2 className="font-black text-2xl text-white">Online players</h2>
          <div className="p-1 border rounded-[10] bg-button-bg border-button-border flex h-fit">
            <div className="grow basis-0 h-fit"> <input type="radio" id="all" name="players" className="hidden peer" defaultChecked={true} /> <label htmlFor="all" className={`
                p-[10] block rounded-lg text-center text-[13px] font-bold
                border border-button-bg peer-checked:border-x-green
                peer-checked:shadow-players peer-checked:shadow-x-green
                text-white peer-checked:text-x-green
            `}>All</label>
            </div>
            <div className="grow basis-0 h-fit">
              <input type="radio" id="friends" name="players" className="hidden peer" />
              <label htmlFor="friends" className={`
                p-[10] block rounded-lg text-center text-[13px] font-bold
                border border-button-bg peer-checked:border-x-green
                peer-checked:shadow-players peer-checked:shadow-x-green
                text-white peer-checked:text-x-green
            `}>Friends</label>
            </div>
          </div>
          <div className="bg-button-bg border-2 rounded-xl border-button-border py-3 px-4 flex gap-3">
            <div className="h-5 min-w-5 max-w-5 flex justify-center items-center">
              <Image
                width="16"
                height="16"
                alt="magnifying glass logo"
                src="search.svg"
                className="w-4 h-4"
              />
            </div>
            <input type="text" placeholder="Search for players by name" className="text-sm block w-full" />
          </div>
          <PlayersList />
        </div>
        <div className="grow basis-0 border-section-border border-2 bg-section-bg p-8 rounded-3xl flex flex-col gap-6">
          <h2 className="font-black text-2xl text-white">Game Invites</h2>
          <div className="p-1 border rounded-[10] bg-button-bg border-button-border flex h-fit">
            <div className="grow basis-0 h-fit"> <input type="radio" id="all" name="players" className="hidden peer" defaultChecked={true} /> <label htmlFor="all" className={`
                p-[10] block rounded-lg text-center text-[13px] font-bold
                border border-button-bg peer-checked:border-x-green
                peer-checked:shadow-players peer-checked:shadow-x-green
                text-white peer-checked:text-x-green
            `}>All</label>
            </div>
            <div className="grow basis-0 h-fit">
              <input type="radio" id="friends" name="players" className="hidden peer" />
              <label htmlFor="friends" className={`
                p-[10] block rounded-lg text-center text-[13px] font-bold
                border border-button-bg peer-checked:border-x-green
                peer-checked:shadow-players peer-checked:shadow-x-green
                text-white peer-checked:text-x-green
            `}>Friends</label>
            </div>
          </div>
          <div className="bg-button-bg border-2 rounded-xl border-button-border py-3 px-4 flex gap-3">
            <div className="h-5 min-w-5 max-w-5 flex justify-center items-center">
              <Image
                width="16"
                height="16"
                alt="magnifying glass logo"
                src="search.svg"
                className="w-4 h-4"
              />
            </div>
            <input type="text" placeholder="Search for players by name" className="text-sm block w-full" />
          </div>
          <PlayersList />
        </div>
      </section>
    </main>
  )
}
