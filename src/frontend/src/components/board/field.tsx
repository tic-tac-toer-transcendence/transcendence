import Cell from "@/components/board/cell"

export default function Field() {
  return (
    <ul className="max-w-md bg-button-bg border-2 rounded-xl border-button-border p-2 grid grid-rows-3 grid-cols-3 gap-1 w-full">
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </ul>
  )
}
