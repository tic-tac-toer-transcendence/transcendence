import Image from "next/image";
import Sidebar from "@/components/sidebar"

export default function Home() {
  return (
      <main className="flex">
		<Sidebar></Sidebar>
		<section className="flex flex-col align-center">
			<h1>Home page</h1>
			Under construction
		</section>
      </main>
  );
}
