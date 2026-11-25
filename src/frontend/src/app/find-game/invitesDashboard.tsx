"use client"

import { useContext } from "react";
import { InviteContext } from "./presenceProvider"
import inviteAcceptAction from "@/actions/inviteAccept";

export default function InvitesDashboard() {
  const invite = useContext(InviteContext);
  return (
    <div className="grow max-h-fit p-8 bg-section-bg border-2 border-section-border rounded-3xl flex flex-col gap-4">
      <h2 className="font-black text-2xl text-white">Invites</h2>
      <div>Invite from <span>{invite.username}</span></div>
      <div className="flex gap-2">
        <button className="bg-button-bg border-2 border-button-border rounded-lg py-2 px-4 font-extrabold text-white uppercase cursor-pointer">decline</button>
        <form action={inviteAcceptAction}>
          <input type="hidden" />
          <button className="bg-button-bg border-2 border-button-border rounded-lg py-2 px-4 font-extrabold text-white uppercase cursor-pointer">accept</button>
        </form>
      </div>
    </div>
  )
}
