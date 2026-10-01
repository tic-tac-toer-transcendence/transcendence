import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toer",
  description: "Ultimate Tic Tac Toe game platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
