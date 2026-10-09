"use client"
import Link from "next/link"
import Form from "next/form"
import handleLoginForm from "@/app/login/actions"
import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"
import { useActionState, useState } from "react";
import { z } from "zod";

export interface LoginFormState {
  email: string,
  password: string,
  emailErrors: z.core.$ZodIssue[],
  passwordErrors: string[]
}

const initialState = {
  email: "",
  emailErrors: [],
  password: "",
  passwordErrors: []
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
    <Form action={formAction} id="#login-form" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm text-white" htmlFor="email">Email address</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Your email"
          type="email"
          name="email"
          autoComplete="email"
          id="email"
          defaultValue={state.email}
          required
        />
        <p>{state.emailErrors.length ? state.emailErrors[0].message : ""}</p>
      </div>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="password">Password</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Password"
          type={type}
          name="password"
          id="password"
          defaultValue={state.password}
          required
        />
        <button className="stroke-2 stroke-foreground absolute right-4 bottom-4 cursor-pointer" onClick={toggleVisibility} type="button"><PasswordToggleIcon/></button>
      </div>
      <Link href="/forgot-password" className="text-right font-semibold text-sm text-x-green">Forgot password?</Link>
      <button className="font-semibold bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green rounded-lg w-full p-4 hover:text-x-green cursor-pointer" disabled={pending}>Log in</button>
    </Form>
  )
}
