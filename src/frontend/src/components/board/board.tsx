import Field, { FieldState } from "@/components/board/field";

export interface BoardState {
  fields: FieldState[]
}

export default function Board({ state }: { state: BoardState }) {
  return (
    <div className="bg-background rounded-2xl p-3 grid grid-rows-3 grid-cols-3 gap-3 w-full max-w-md">
      {state.fields.map((state, i) => {
        return <Field key={i} state={state} />
      })}
    </div>
  )
}

