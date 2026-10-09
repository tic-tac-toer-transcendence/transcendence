import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"

export default function CreateAccount() {
  return (
    <main className="grow p-20 flex justify-center">
      <section className="w-md h-fit p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <div>
          <h1 className="text-white font-black text-4xl text-center">Welcome to <span className="text-x-green block">Tic Tac Toer</span></h1>
          <p className="text-center text-base">Enter your email and password</p>
        </div>
        <form id="#login-form" className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-sm text-white">Email address</label>
            <input
              className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
              placeholder="Your email"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-sm text-white">Password</label>
            <input
              className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
              placeholder="Password"
            >
            </input>
            <button className="stroke-2 stroke-foreground absolute right-4 bottom-4"><PasswordToggleIcon/></button>
          </div>
          <div className="flex items-center gap-4">
            <hr className="grow block" />
            <span className="font-semibold text-sm">Chose a username (you can change it later)</span>
            <hr className="grow block" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-sm text-white">Username</label>
            <input
              className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
              placeholder="Username"
            />
          </div>
          <button className="font-semibold bg-button-bg border border-button-border rounded-lg w-full p-4">Log in</button>
        </form>
      </section>
    </main>
  )
}
