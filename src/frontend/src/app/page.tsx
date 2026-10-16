import Board, { BoardState } from "@/components/board/board";
import Link from "next/link";

export default function Home() {

  const heroBoardState: BoardState = {
    fields: [
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: "X"}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: "O"}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: "X"},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },
      {
        active: false,
        claimed: null,
        cells: [
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
          {claimed: null}, {claimed: null}, {claimed: null},
        ],
      },

    ]
  };

  return (
    <main className="grow flex p-24">
      <section className="flex gap-16 w-full justify-center items-center">
        <div className="flex flex-col gap-8">
          <div className="max-w-md flex flex-col gap-4">
            <h1 className="font-black text-6xl text-white">Tic Tac Toe, <span className="text-x-green">elevated</span></h1>
            <p className="text-lg">{`Ultimate Tic Tac Toe is a mind-bending, nested variant of the classic game. Every move you make forces your opponent into a specific sub-board. It's easy to learn, but carries tactical depth that will test your chess-like planning.`}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/play" className="px-7 py-3 border-2 border-button-border hover:border-x-green rounded-lg font-bold text-white uppercase">Play now</Link>
            <Link href="/rules" className="px-7 py-3 border-2 border-button-border hover:border-x-green rounded-lg font-bold text-white uppercase">Read rules</Link>
          </div>
        </div>
        <Board state={heroBoardState} />
      </section>
    </main>
  );
}
