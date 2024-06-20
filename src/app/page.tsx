import Link from "next/link";
import Countdown from "@/components/ui/Countdown";
import { BsTelegram as telegram } from "react-icons/bs";
import { Icon } from "@/components/ui/Icon";
import { getDate } from "@/lib/utils";

export default async function Home() {
	const target = await getDate();

	return (
		<>
			<div className="flex flex-col text-center">
				<h2 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">Welcome to the Bitcoin Poker Tour.</h2>
				<h3 className="text-2xl font-semibold text-center text-neutral-700 dark:text-neutral-300">Live Poker.</h3>
				<h3 className="text-2xl font-semibold text-center text-neutral-700 dark:text-neutral-300">Bitcoin buy ins.</h3>
				<h3 className="text-2xl font-semibold text-center text-neutral-700 dark:text-neutral-300">Coming soon!</h3>
			</div>
			<div className="flex top-2 sm:w-full countdown text-slate-900 md:w-100 justify-center mb-3">
				<Countdown newTarget={target} />
			</div>
			<div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-5 lg:text-left">
				<Link
					href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					rel="noopener noreferrer"
				>
					<h2 className="mb-3 text-2xl font-semibold">
						Events <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">Browse upcoming events and register to play.</p>
				</Link>

				<Link
					href="/buybitcoin"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					rel="noopener noreferrer"
				>
					<h2 className="mb-3 text-2xl font-semibold">
						Buy Bitcoin <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">Learn how to buy and store Bitcoin securely.</p>
				</Link>
				<Link
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					target="_blank"
					rel="noopener noreferrer"
					href={"https://t.me/+4_ll8Wiu8zQ0MTE9"}
				>
					<h2 className="mb-3 text-2xl font-semibold">
						Telegram <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">Join our Telegram</p>
				</Link>
				<Link
					href="/inscriptions"
					className="group rounded-lg border border-transparent px-4 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					rel="noopener noreferrer"
				>
					<h2 className="mb-3 text-2xl font-semibold">
						Inscriptions <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">See past winners immortalized in the Bitcoin blockchain!</p>
				</Link>

				<Link
					href="/schedule"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					rel="noopener noreferrer"
				>
					<h2 className="mb-3 text-2xl font-semibold">
						Register <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">Ready to jump in? Buy into the next Bitcoin Poker Tour event.</p>
				</Link>
			</div>
		</>
	);
}
