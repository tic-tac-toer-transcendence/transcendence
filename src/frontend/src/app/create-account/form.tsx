"use client"
import Form from "next/form"
import PasswordToggleIcon from "@/components/icons/passwordToggleIcon"
import XIcon from "@/components/icons/xIcon";
import OIcon from "@/components/icons/oIcon";
import createAccountAction from "@/actions/createAccount";
import { useState, useActionState } from "react";

export interface CreateUserState {
  email: string,
  emailError: string,
  password: string,
  passwordError: string,
  username: string,
  usernameError: string,
  gender: "X" | "O" | undefined,
  genderError: string
}

const initialState: CreateUserState = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  username: "",
  usernameError: "",
  gender: undefined,
  genderError: ""
}

export default function CreateUserForm() {
  const [type, setType] = useState("password");
  const [state, formAction, pending] = useActionState(createAccountAction, initialState);

  function toggleVisibility() {
    if (type === "password")
      setType("text")
    else
      setType("password")
  }
  
  return (
    <Form action={formAction} id="create-account" className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-sm text-white" htmlFor="email">Email address</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Your email"
          id="email"
          type="email"
          name="email"
          defaultValue={state.email}
          autoComplete="email"
          required
        />
        {state.emailError.length !== 0 && <p className="text-red-500 font-semibold text-sm">{state.emailError}</p>}
      </div>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="pass">Password</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Password"
          id="pass"
          name="password"
          type={type}
          defaultValue={state.password}
          required
        />
        <button className="cursor-pointer stroke-2 stroke-foreground absolute right-4 top-11" onClick={toggleVisibility} type="button"><PasswordToggleIcon/></button>
        {state.passwordError.length !== 0 && <p className="text-red-500 font-semibold text-sm">{state.passwordError}</p>}
      </div>
      <span className="font-semibold text-center text-sm">Chose a username and a symbol (you can change it later)</span>
      <div className="flex flex-col gap-2 relative">
        <label className="font-bold text-sm text-white" htmlFor="username">Username</label>
        <input
          className="block w-full p-4 bg-button-bg border border-button-border rounded-lg"
          placeholder="Username"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          defaultValue={state.username}
          required
        />
        {state.usernameError.length !== 0 && <p className="text-red-500 font-semibold text-sm">{state.usernameError}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-10 justify-center">
          <div>
            <input
              type="radio"
              name="gender"
              id="x"
              value="X"
              className="hidden peer"
              defaultChecked={state.gender === "X"}
            />
            <label htmlFor="x"
              className={`
                cursor-pointer
                fill-x-green
                w-21 h-21 block
                p-5 rounded-full
                bg-button-bg
                border-2 peer-checked:border-x-green border-button-border hover:border-x-green 
                hover:shadow-sidebar hover:shadow-x-green peer-checked:shadow-sidebar peer-checked:shadow-x-green
              `}
            >
              <XIcon className="" />
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              id="o"
              value="O"
              className="hidden peer"
              defaultChecked={state.gender === "O"}
            />
            <label htmlFor="o"
              className={`
                cursor-pointer
                fill-o-purple
                w-21 h-21 block
                p-5 rounded-full
                bg-button-bg
                border-2 peer-checked:border-o-purple border-button-border hover:border-o-purple 
                hover:shadow-sidebar hover:shadow-o-purple peer-checked:shadow-sidebar peer-checked:shadow-o-purple
              `}
            >
              <OIcon className="" />
            </label>
          </div>
        </div>
        {state.genderError.length !== 0 && <p className="text-red-500 font-semibold text-center text-sm">{state.genderError}</p>}
      </div>
      <button className="font-semibold bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green rounded-lg w-full p-4 hover:text-x-green cursor-pointer" disabled={pending}>Create account</button>
    </Form>
  )
}
