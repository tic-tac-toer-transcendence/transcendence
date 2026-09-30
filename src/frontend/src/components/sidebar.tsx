import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
	return (
		<aside className="h-screen w-[250] bg-section-bg border-r border-section-border">
			<nav className="p-[24] flex flex-col">
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
						<li><Link href="/play" className="bg-button-bg border border-button-border px-[12] py-[14] block rounded-xl">Play</Link></li>
						<li><Link href="/ws-test" className="bg-button-bg border border-button-border px-[12] py-[14] block rounded-xl">Ws Test</Link></li>
					</ul>
				</section>
			</nav>
		</aside>
	)
}
