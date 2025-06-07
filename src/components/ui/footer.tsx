import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center">
					<p className="text-base text-neutral-500">© {new Date().getFullYear()} Bitcoin Poker Tour. All rights reserved.</p>
					                <Link href="/admin" className="text-sm text-neutral-400 hover:text-orange-500">
						Admin
					</Link>
				</div>
			</div>
		</footer>
	);
}
