"use client"

import LoginIcon from "./icons/loginIcon"
import logOutAction from "@/actions/logout"

export default function SidebarLogOutButton() {
  return (
    <li>
      <button className="bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green px-[12] py-[14] rounded-xl flex gap-3 hover:text-x-green stroke-foreground hover:stroke-x-green stroke-2" onClick={logOutAction} type="button">
        <LoginIcon />
          <span className="font-semibold text-sm">
            Log out
          </span>
      </button>
    </li>
  )
}
