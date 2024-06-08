import Image from "next/image";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
];

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Menubar className='bg-white border-b border-gray-200'>
				<MenubarMenu>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Home
					</MenubarTrigger>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Schedule
					</MenubarTrigger>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Promotions
					</MenubarTrigger>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Treasury
					</MenubarTrigger>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Bitcoin Guide
					</MenubarTrigger>
					<MenubarTrigger className='hover:bg-gray-100 px-4 py-2 cursor-pointer'>
						Contact
					</MenubarTrigger>
					<MenubarContent className='bg-white border border-gray-200'>
						<MenubarItem className='hover:bg-gray-100 px-4 py-2'>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			<div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
				<Image
					className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert'
					src='/btcpt.svg'
					alt='Bitcoin Poker Tour'
					width={360}
					height={54}
					priority
				/>
			</div>

			<div>
				<h2 className='text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100'>
					Welcome to the Bitcoin Poker Tour.
				</h2>
				<h3 className='text-2xl font-semibold text-center text-neutral-700 dark:text-neutral-300'>
					Live Poker. Bitcoin buy ins.
				</h3>
			</div>

			<div className='mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left'>
				<a
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className='mb-3 text-2xl font-semibold'>
						Events{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className='m-0 max-w-[30ch] text-sm opacity-50'>
						Browse upcoming events and register to play.
					</p>
				</a>

				<a
					href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className='mb-3 text-2xl font-semibold'>
						Buy Bitcoin{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className='m-0 max-w-[30ch] text-sm opacity-50'>
						Learn how to buy and store Bitcoin securely.
					</p>
				</a>

				<a
					href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className='mb-3 text-2xl font-semibold'>
						Inscriptions{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className='m-0 max-w-[30ch] text-sm opacity-50'>
						See past winners immortalized in the Bitcoin blockchain!
					</p>
				</a>

				<a
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
					target='_blank'
					rel='noopener noreferrer'>
					<h2 className='mb-3 text-2xl font-semibold'>
						Register{" "}
						<span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
							-&gt;
						</span>
					</h2>
					<p className='m-0 max-w-[30ch] text-balance text-sm opacity-50'>
						Ready to jump in? Buy into the next Bitcoin Poker Tour event.
					</p>
				</a>
			</div>
		</main>
	);
}
