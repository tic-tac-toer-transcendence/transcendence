import XIcon from "@/components/icons/xIcon"
import OIcon from "@/components/icons/oIcon"

interface PlayerProps {
  name: string,
  friend: "none" | "sent" | "recieved" | "friend",
  icon: "X" | "O"
}

export default function Player({name, friend, icon}: PlayerProps) {
  return (
    <li className="bg-button-bg border-2 border-button-border p-4 rounded-xl flex items-center justify-between max-w-full gap-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-x-green-dim border-2 rounded-full border-x-green flex justify-center items-center shadow-sidebar shadow-x-green">
          {icon === "X" && <XIcon className="w-4 fill-x-green" />}
          {icon === "O" && <OIcon className="w-4 fill-o-purple" />}
        </div>
        <span className="font-bold text-white text-base block overflow-hidden whitespace-nowrap text-ellipsis">
          {name}
        </span>
      </div>
      <button className="bg-button-bg border-2 border-button-border hover:border-x-green rounded-lg py-2 px-4 font-extrabold text-white text-xs uppercase cursor-pointer">
        {friend === "none" && "add friend"}
        {friend === "sent" && "Friend request sent"}
        {friend === "recieved" && "Accept friend request"}
        {friend === "friend" && "Challenge"}
      </button>
    </li>
  )
}
