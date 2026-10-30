"use server"
import Link from "next/link";
import Image from "next/image";
import SidebarLink from "@/components/sidebarLink"
import HomeIcon from "@/components/icons/homeIcon";
import PlayIcon from "@/components/icons/playIcon";
import LoginIcon from "./icons/loginIcon";
import QuestionIcon from "./icons/questionIcon";
import SidebarLogOutButton from "./sidebarLogOutButton";
import { cookies } from "next/headers";

export default async function Sidebar() {
  const cookieStore = await cookies();

  return (
    <aside className="h-screen w-[250] bg-section-bg border-r-2 border-section-border sticky top-0 left-0">
      <nav className="p-[24] h-full flex flex-col justify-between">
        <section className="flex flex-col gap-[16]">
          <button>
            <Link href="/" className="text-white text-sm uppercase font-black flex flex-col items-center gap-2">
              <Image
                width="40"
                height="40"
                src="logo.svg"
                alt="website logo"
                className="border rounded-xl border-section-border p-[10] w-[40] h-[40]"
              />
              Tic Tac Toer
            </Link>
          </button>
          <ul className="flex flex-col gap-[8]">
            <SidebarLink path="/" text="Home">
              <HomeIcon />
            </SidebarLink>
            <SidebarLink path="/play" text="Play">
              <PlayIcon />
            </SidebarLink>
            <SidebarLink path="/ws-test" text="WS Test">
              <HomeIcon />
            </SidebarLink>
          </ul>
        </section>
        <section>
          <ul className="flex flex-col gap-[8]">
            {
              !cookieStore.has("session")
                ? <>
                    <SidebarLink path="/login" text="Log In">
                      <LoginIcon />
                    </SidebarLink>
                  </>
                : <>
                    <SidebarLink path="/profile" text="Profile">
                      <LoginIcon />
                    </SidebarLink>
                    <SidebarLogOutButton />
                  </>
            }
            <SidebarLink path="/how-to-play" text="How to Play">
              <QuestionIcon />
            </SidebarLink>
          </ul>
        </section>
      </nav>
    </aside>
  )
}
