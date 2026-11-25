import { PlayerProfile } from "@/types/playerProfile"
import Player from "@/app/find-game/player"
import Image from "next/image"

export default function PlayersList({ players }: { players: PlayerProfile[]}) { return (
    <div className="grow-2 border-section-border border-2 bg-section-bg p-8 rounded-3xl flex flex-col gap-6">
      <h2 className="font-black text-2xl text-white">Online players</h2>
      <div className="p-1 border rounded-[10] bg-button-bg border-button-border flex h-fit">
        <div className="grow basis-0 h-fit">
          <input type="radio" id="all" name="players" className="hidden peer" defaultChecked={true} value="all" />
          <label htmlFor="all" className={`
            p-[10] block rounded-lg text-center text-[13px] font-bold
            border border-button-bg peer-checked:border-x-green
            peer-checked:shadow-players peer-checked:shadow-x-green
            text-white peer-checked:text-x-green
          `}>All</label>
        </div>
        <div className="grow basis-0 h-fit">
          <input type="radio" id="requests" name="players" className="hidden peer" value="requests" />
          <label htmlFor="requests" className={`
            p-[10] block rounded-lg text-center text-[13px] font-bold
            border border-button-bg peer-checked:border-x-green
            peer-checked:shadow-players peer-checked:shadow-x-green
            text-white peer-checked:text-x-green
          `}>Requests</label>
        </div>
        <div className="grow basis-0 h-fit">
          <input type="radio" id="friends" name="players" className="hidden peer" value="friends" />
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
      <ul className="flex flex-col gap-3 min-h-0 overflow-auto scrollbar-auto scrollbar-gutter-stable scrollbar-track-section-bg scrollbar-thumb-section-border">
        {players.map((player, i) => {
          return (<Player key={i} name={player.username} id={player.id} friend="friend" icon={player.gender} />)
        })}
      </ul>
    </div>
  )
}
