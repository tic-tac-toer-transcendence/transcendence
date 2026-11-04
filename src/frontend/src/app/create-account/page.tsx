import CreateUserForm from "@/app/create-account/form"

export default function CreateAccount() {
  return (
    <main className="grow p-20 flex justify-center">
      <section className="w-md h-fit p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <div>
          <h1 className="text-white font-black text-4xl text-center">Welcome to <span className="text-x-green block">Tic Tac Toer</span></h1>
          <p className="text-center text-base">Enter your email and password</p>
        </div>
        <CreateUserForm />
      </section>
    </main>
  )
}
