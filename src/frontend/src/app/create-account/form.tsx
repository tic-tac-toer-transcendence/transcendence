"use client"
import Form from "next/form"
import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"
import createUserAction from "./actions";
import { useState, useActionState } from "react";
import XIcon from "@/components/icons/xIcon";
import OIcon from "@/components/icons/oIcon";

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
  const [state, formAction, pending] = useActionState(createUserAction, initialState);

  function toggleVisibility() {
    if (type === "password")
      setType("text")
    else
      setType("password")
  }
  
  return (
    <Form action={formAction} id="create-user" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm text-white" htmlFor="email">Email address</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Your email"
          id="email"
          defaultValue={state.email}
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="pass">Password</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Password"
          id="pass"
          defaultValue={state.password}
        />
        <button className="stroke-2 stroke-foreground absolute right-4 bottom-4" onClick={toggleVisibility}><PasswordToggleIcon/></button>
      </div>
      <span className="font-semibold text-center text-sm">Chose a username (you can change it later)</span>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="username">Username</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Username"
          id="username"
          autoComplete="off"
        />
      </div>
      <span className="font-semibold text-center text-sm">Chose your gender (you can change it later)</span>
      <div className="flex gap-10 justify-center">
        <label htmlFor="x" className="cursor-pointer fill-x-green w-21 h-21 block bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green p-5 rounded-full"><XIcon /></label>
        <input
          type="radio"
          name="gender"
          id="x"
          value="x"
          className="hidden"
          required
        />
        <label htmlFor="o" className="cursor-pointer fill-o-purple w-21 h-21 block bg-button-bg border-2 border-button-border hover:border-o-purple hover:shadow-sidebar hover:shadow-o-purple p-5 rounded-full"><OIcon /></label>
        <input
          type="radio"
          name="gender"
          id="o"
          value="o"
          className="hidden"
        />
      </div>
      <button disabled={pending} className="font-semibold bg-button-bg border border-button-border rounded-lg w-full p-4">Log in</button>
    </Form>
  )
}
