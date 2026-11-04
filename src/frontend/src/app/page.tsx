import Board from "@/components/board/board";
import Rules from "@/components/rules"
import { heroBoardState } from "@/components/board/presets";
import Link from "next/link";

export default function Home() {

  return (
    <main className="grow flex flex-col">
      <section className="flex p-24 gap-16 w-full h-screen justify-center items-center" id="landing">
        <div className="flex flex-col gap-8">
          <div className="max-w-md flex flex-col gap-4">
            <h1 className="font-black text-6xl text-white">Tic Tac Toe, <span className="text-x-green">elevated</span></h1>
            <p className="text-lg">{`Ultimate Tic Tac Toe is a mind-bending, nested variant of the classic game. Every move you make forces your opponent into a specific sub-board. It's easy to learn, but carries tactical depth that will test your chess-like planning.`}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/play" className="px-7 py-3 border-2 border-button-border hover:border-x-green rounded-lg font-bold text-white uppercase">Play now</Link>
            <Link href="#rules" className="px-7 py-3 border-2 border-button-border hover:border-x-green rounded-lg font-bold text-white uppercase">Read rules</Link>
          </div>
        </div>
        <div className="bg-section-bg border-2 rounded-3xl border-section-border p-8 max-w-lg w-full h-fit">
          <Board state={heroBoardState()} />
        </div>
      </section>
      <Rules />
    </main>
  );
}
