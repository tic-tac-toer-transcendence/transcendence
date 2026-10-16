import Field from "@/components/board/field";

export default function Board() {
  return (
    <section className="bg-section-bg border-2 rounded-3xl border-section-border p-8 max-w-lg w-full h-fit">
      <div className="bg-background rounded-2xl p-3 grid grid-rows-3 grid-cols-3 gap-3 w-full">
        <Field />
        <Field />
        <Field />
        <Field />
        <Field />
        <Field />
        <Field />
        <Field />
        <Field />
      </div>
    </section>
  )
}

