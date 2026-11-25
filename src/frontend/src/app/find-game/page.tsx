import PresenceProvider from "./presenceProvider"
import botGameAction from "@/actions/botGame"
import PlayersList from "./playersList";
import fetchPlayers from "./fetchPlayers";

export default async function FindGame({ searchParams }: { searchParams: Promise<{ filter? : "all" | "requests" | "friends" }>}) {
  const { filter = "all" } = await searchParams;
  
  const players = await fetchPlayers(filter);
  
  return (
    <PresenceProvider>
      <main className="basis-full p-12 flex flex-col gap-12 max-h-screen">
        <section className="border-section-border border-2 bg-section-bg p-6 rounded-3xl flex justify-between">
          <div>
            <h1 className="font-black text-4xl text-white">Find game</h1>
            <p className="text-base">Add friends from the list of online players or challenge online friends</p>
          </div>
          <form action={botGameAction} className="flex">
            <button className="px-4 bg-button-bg border-2 border-button-border rounded-xl cursor-pointer" >
              Play against Bot
            </button>
          </form>
        </section>
        <section className="flex gap-8 min-h-0">
          <PlayersList players={players} />
          <div className="grow">
            Invites
          </div>
        </section>
      </main>
    </PresenceProvider>
  )
}
