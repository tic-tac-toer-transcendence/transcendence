"use client"
import Form from "next/form"
import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"
import createUserAction from "./actions";
import { useState, useActionState } from "react";

export interface CreateUserState {
  email: string,
  emailError: string,
  password: string,
  passwordError: string,
  username: string,
  usernameError: string
}

const initialState: CreateUserState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  username: "",
  usernameError: ""
}

export default function CreateUserForm() {
  const [type, setType] = useState("password");
  const [state, formAction, pending] = useActionState<CreateUserState>(createUserAction, initialState);

  function toggleVisibility() {
    if (type === "password")
      setType("text")
    else
      setType("password")
  }
  
  return (
    <Form action={formAction} id="create-user" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm text-white">Email address</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Your email"
          defaultValue={state.email}
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white">Password</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Password"
        >
        </input>
        <button className="stroke-2 stroke-foreground absolute right-4 bottom-4" onClick={toggleVisibility}><PasswordToggleIcon/></button>
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
      <button disabled={pending} className="font-semibold bg-button-bg border border-button-border rounded-lg w-full p-4">Log in</button>
    </Form>
  )
}
