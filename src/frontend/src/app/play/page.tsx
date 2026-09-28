import Sidebar from "@/components/sidebar"

export default function Play() {
	const someVar = 5;
	return (
		<main className="flex">
			<Sidebar></Sidebar>
			<section>Put game here</section>
			<section>{someVar + someVar}</section>
		</main>
	)
}
