import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Menu from "@/components/ui/menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Bitcoin Poker Tour",
	description: "Live poker with bitcoin"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex h-auto sm:w-screen md:w-auto flex-col items-center justify-between p-16">
					<div className="flex items-center">
						<Image
							className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
							src="/btcpt.svg"
							alt="Bitcoin Poker Tour"
							width={360}
							height={54}
							priority
						/>
					</div>
					<Menu />
					{children}
				</main>
			</body>
		</html>
	);
}
