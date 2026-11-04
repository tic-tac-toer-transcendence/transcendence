"use client"
import Link from "next/link"
import Form from "next/form"
import handleLoginForm from "@/app/login/actions"
import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"
import { useActionState, useState } from "react";

export interface LoginFormState {
  email: string,
  emailError: string
  password: string,
  passwordError: string
}

const initialState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: ""
}

export default function LoginForm() {
  const [type, setType] = useState("password");
  const [state, formAction, pending] = useActionState(handleLoginForm, initialState)

  function toggleVisibility() {
    if (type === "password")
      setType("text")
    else
      setType("password")
  }

  return (
    <Form action={formAction} id="login" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm text-white" htmlFor="email">Email address</label>
        <input
          className={
            `block w-full p-4 bg-button-bg border-2 ${state.emailError.length ? "border-red-500" : "border-button-border"} rounded-lg`
          }
          placeholder="Your email"
          type="email"
          name="email"
          autoComplete="email"
          id="email"
          defaultValue={state.email}
          required
        />
        {state.emailError.length ? <p className="text-red-500 font-semibold text-sm">{state.emailError}</p> : ""}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="password">Password</label>
        <input
          className="block w-full p-4 bg-button-bg border-2 border-button-border rounded-lg"
          placeholder="Password"
          type={type}
          name="password"
          id="password"
          defaultValue={state.password}
          required
        />
        <button className="stroke-2 stroke-foreground absolute right-4 bottom-4 cursor-pointer" onClick={toggleVisibility} type="button"><PasswordToggleIcon/></button>
        {state.passwordError.length ? <p className="text-red-500 font-semibold text-sm">{state.passwordError}</p> : ""}
      </div>
      <Link href="/forgot-password" className="text-right font-semibold text-sm text-x-green">Forgot password?</Link>
      <button className="font-semibold bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green rounded-lg w-full p-4 hover:text-x-green cursor-pointer" disabled={pending}>Log in</button>
    </Form>
  )
}
