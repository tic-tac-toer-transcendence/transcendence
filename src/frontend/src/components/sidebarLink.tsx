import Link from "next/link";
import { ReactElement } from "react";

interface SidebarLinkProps {
	children: ReactElement;
	path: string;
	text: string;
}

export default function SidebarLink({children, path, text}: SidebarLinkProps) {
	return (
		<li>
			<Link href={path} className="bg-button-bg border-2 border-button-border hover:border-x-green hover:shadow-sidebar hover:shadow-x-green px-[12] py-[14] rounded-xl flex gap-3 hover:text-x-green stroke-foreground hover:stroke-x-green stroke-2">
				{children}
				<span className="font-semibold text-sm">
					{text}
				</span>
			</Link>
		</li>
	)
}
