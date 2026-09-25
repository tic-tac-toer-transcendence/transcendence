import Link from "next/link";

export default function Sidebar() {
	return (
		<aside className="h-screen w-[250] bg-section-bg border-r border-section-border">
			<nav className="p-[24] flex flex-col">
				<section className="flex flex-col gap-[16]">
					<button><Link href="/" className="text-white text-sm uppercase font-black">Tic Tac Toer</Link></button>
					<ul className="flex flex-col gap-[8]">
						<li><Link href="/play" className="bg-button-bg border border-button-border px-[12] py-[14] block rounded-xl">Play</Link></li>
						<li><Link href="/ws-test" className="bg-button-bg border border-button-border px-[12] py-[14] block rounded-xl">Ws Test</Link></li>
					</ul>
				</section>
			</nav>
		</aside>
	)
}
