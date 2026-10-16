import Field, { FieldState } from "@/components/board/field";

export interface BoardState {
  fields: FieldState[]
}

interface BoardProps {
  state: BoardState
}

export default function Board({ state }: BoardProps) {
  return (
    <section className="bg-section-bg border-2 rounded-3xl border-section-border p-8 max-w-lg w-full h-fit">
      <div className="bg-background rounded-2xl p-3 grid grid-rows-3 grid-cols-3 gap-3 w-full">
        {state.fields.map((state, i) => {
          return <Field key={i} state={state} />
        })}
      </div>
    </section>
  )
}

