import Link from "next/link"
import LoginForm from "@/app/login/form"

export default function LogIn() {
  return (
    <main className="grow p-18 flex justify-center">
      <section className="w-md h-fit p-6 bg-section-bg border border-section-border rounded-3xl flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <h1 className="text-white font-black text-4xl text-center">Welcome to <span className="text-x-green block">Tic Tac Toer</span></h1>
          <p className="text-center text-base">Log in to continue your matches, manage your profile, and challenge friends.</p>
        </div>
        <div className="flex flex-col gap-3">
          <ul className="flex gap-3">
            <li className="p-4 bg-button-bg border border-button-border rounded-lg text-center w-1/2">Google</li>
            <li className="p-4 bg-button-bg border border-button-border rounded-lg text-center w-1/2">Github</li>
          </ul>
          <ul className="flex gap-3">
            <li className="p-4 bg-button-bg border border-button-border rounded-lg text-center w-1/2">42</li>
            <li className="p-4 bg-button-bg border border-button-border rounded-lg text-center w-1/2">Roblox</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <hr className="grow block" />
          <span className="font-semibold text-sm">or continue with email</span>
          <hr className="grow block" />
        </div>
        <LoginForm />
        <p className="text-center text-sm">New to Tic Tac Toer? <Link href="/create-account" className="font-semibold text-x-green">Create an account</Link></p>
      </section>
    </main>
  )
}
