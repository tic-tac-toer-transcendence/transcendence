import XIcon from "@/components/icons/xIcon"
import OIcon from "@/components/icons/oIcon"
import Image from "next/image"
export default function FindGame() {
  return (
    <main className="grow p-12 flex flex-col gap-12 max-h-screen">
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
          <ul className="flex flex-col gap-3 min-h-0 overflow-auto scrollbar-auto scrollbar-gutter-stable scrollbar-track-section-bg scrollbar-thumb-section-border">
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-x-green-dim border-2 rounded-full border-x-green flex justify-center items-center shadow-sidebar shadow-x-green">
                  <XIcon className="w-4 fill-x-green" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Add friend
              </button>
            </li>
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-o-purple-dim border-2 rounded-full border-o-purple flex justify-center items-center shadow-sidebar shadow-o-purple">
                  <OIcon className="w-4 fill-o-purple" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Challenge
              </button>
            </li>
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-o-purple-dim border-2 rounded-full border-o-purple flex justify-center items-center shadow-sidebar shadow-o-purple">
                  <OIcon className="w-4 fill-o-purple" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Accept Invite
              </button>
            </li>
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-x-green-dim border-2 rounded-full border-x-green flex justify-center items-center shadow-sidebar shadow-x-green">
                  <XIcon className="w-4 fill-x-green" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Add friend
              </button>
            </li>
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-o-purple-dim border-2 rounded-full border-o-purple flex justify-center items-center shadow-sidebar shadow-o-purple">
                  <OIcon className="w-4 fill-o-purple" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Challenge
              </button>
            </li>
            <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-o-purple-dim border-2 rounded-full border-o-purple flex justify-center items-center shadow-sidebar shadow-o-purple">
                  <OIcon className="w-4 fill-o-purple" />
                </div>
                <span className="font-bold text-white text-base">
                  Player 1
                </span>
              </div>
              <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
                Accept Invite
              </button>
            </li>
          </ul>
        </div>
        <div className="grow p-8 border-2 basis-0">
          Game invites
        </div>
      </section>
    </main>
  )
}
