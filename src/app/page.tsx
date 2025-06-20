import Link from "next/link";
import Countdown from "@/components/ui/countdown";
import { getNextEvent } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function Home() {
	unstable_noStore();
	
	console.log('Fetching next event...');
	const nextEvent = await getNextEvent();
	console.log('Next event:', nextEvent);
	
	return (
		<div className="min-h-screen flex flex-col items-center">
			<div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
				{/* Hero Section */}
				<div className="text-center space-y-8 py-12">
					<h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Bitcoin Poker Tour
					</h1>
					<p className="text-2xl md:text-3xl font-medium text-neutral-700 dark:text-neutral-300">
						Where Crypto Meets Cards
					</p>
					
					{/* Conditional Content Based on Next Event */}
					{nextEvent ? (
						<>
							<h3 className="text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400">
								Next Tournament Starting In:
							</h3>
							
							{/* Countdown Section */}
							<div className="w-full">
								<Countdown newTarget={nextEvent.date} />
							</div>

							{/* Register Button */}
							<div className="pt-8">
								<Link 
									href={`/schedule/${nextEvent._id}`}
									className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
								>
									{/* Gradient Background */}
									<div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full shadow-2xl group-hover:shadow-orange-500/25 transition-all duration-300"></div>
									
									{/* Shimmer Effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-shimmer rounded-full"></div>
									
									{/* Button Content */}
									<div className="relative flex items-center space-x-3">
										<span className="text-2xl">🎯</span>
										<span>Register for Next Event</span>
										<svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
										</svg>
									</div>
								</Link>
							</div>
						</>
					) : (
						/* No Upcoming Events Message */
						<div className="space-y-6">
							<h3 className="text-xl md:text-2xl font-medium text-neutral-600 dark:text-neutral-400">
								No Upcoming Events Scheduled
							</h3>
							<div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg max-w-md mx-auto">
								<p className="text-neutral-600 dark:text-neutral-400 mb-4">
									Stay tuned for our next exciting tournament announcement!
								</p>
								<Link 
									href="/schedule"
									className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium"
								>
									<span>View Previous Events</span>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</Link>
							</div>
						</div>
					)}
				</div>

				{/* Features Grid */}
				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
					{/* Events Card */}
					<Link
						href="/schedule"
						className="transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
					>
						<div className="p-6">
							<div className="text-yellow-500 text-3xl mb-4">🎲</div>
							<h2 className="text-xl font-semibold mb-2">Events</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Browse upcoming tournaments and secure your seat.
							</p>
						</div>
					</Link>

					{/* Buy Bitcoin Card */}
					<Link
						href="/bitcoinguide"
						className="transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
					>
						<div className="p-6">
							<div className="text-orange-500 text-3xl mb-4">₿</div>
							<h2 className="text-xl font-semibold mb-2">Buy Bitcoin</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Learn how to buy and store Bitcoin securely.
							</p>
						</div>
					</Link>

					{/* Telegram Card */}
					<Link
						href="https://t.me/+4_ll8Wiu8zQ0MTE9"
						target="_blank"
						className="transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
					>
						<div className="p-6">
							<div className="text-blue-500 text-3xl mb-4">📱</div>
							<h2 className="text-xl font-semibold mb-2">Telegram</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Join our community on Telegram.
							</p>
						</div>
					</Link>

					{/* Inscriptions Card */}
					<Link
						href="/inscriptions"
						className="transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
					>
						<div className="p-6">
							<div className="text-purple-500 text-3xl mb-4">🏆</div>
							<h2 className="text-xl font-semibold mb-2">Inscriptions</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Winners immortalized on the Bitcoin blockchain.
							</p>
						</div>
					</Link>

					{/* Register Card */}
					<Link
						href="/schedule"
						className="transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl"
					>
						<div className="p-6">
							<div className="text-green-500 text-3xl mb-4">🎯</div>
							<h2 className="text-xl font-semibold mb-2">Register Now</h2>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Ready to play? Join our next tournament.
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
