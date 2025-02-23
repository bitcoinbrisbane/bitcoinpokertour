import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/ui/menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Bitcoin Poker Tour",
	description: "IRL poker with Bitcoin"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800">
					<div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
						<div className="flex items-center justify-center mb-8">
							<Link href="/">
								<Image
									className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
									src="/btcpt.svg"
									alt="Bitcoin Poker Tour"
									width={500}
									height={204}
									priority
								/>
							</Link>
						</div>
						<Menu />
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
