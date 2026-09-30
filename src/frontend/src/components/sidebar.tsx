import Link from "next/link";
import Image from "next/image";
import SidebarLink from "@/components/sidebarLink"
import HomeIcon from "@/components/icons/homeIcon";
import PlayIcon from "@/components/icons/playIcon";

export default function Sidebar() {
	return (
		<aside className="h-screen w-[250] bg-section-bg border-r border-section-border">
			<nav className="p-[24] h-full flex flex-col justify-between">
				<section className="flex flex-col gap-[16]">
					<button>
						<Link href="/" className="text-white text-sm uppercase font-black flex flex-col items-center gap-2">
							<Image
								src="logo.svg"
								alt="website logo"
								width={40}
								height={40}
								className="border rounded-xl border-section-border p-[10]"
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
						<SidebarLink path="/login" text="Log In">
							<HomeIcon />
						</SidebarLink>
						<SidebarLink path="/how-to-play" text="How to Play">
							<PlayIcon />
						</SidebarLink>
					</ul>
				</section>
			</nav>
		</aside>
	)
}
