import Board, { BoardProps } from "@/components/board/board"

export default function Play() {

  return (
    <main className="flex justify-center grow items-center">
      <Board fields={initBoardState.fields} />
    </main>
  )
}
