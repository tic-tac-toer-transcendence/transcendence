import Board from "@/components/board/board"
import { stepOneBoardState } from "@/components/board/presets"

export default function Play() {

  return (
    <main className="flex justify-center grow items-center">
      <Board state={stepOneBoardState()} />
    </main>
  )
}
