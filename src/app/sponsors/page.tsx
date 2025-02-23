const Sponsors = () => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-12">
				{/* Header Section */}
				<div className="text-center space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Become a Sponsor
					</h1>
					<p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300">
						Shape the Future of Bitcoin Gaming
					</p>
				</div>

				{/* Main Content */}
				<div className="space-y-8">
					{/* Value Proposition Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Innovation</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Partner with the first poker tour fully integrated with the Bitcoin Network, showcasing real-world cryptocurrency applications.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Community</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Connect with a passionate community of Bitcoin enthusiasts and poker players across Australia.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Exposure</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Gain visibility through our events, social media, and blockchain inscriptions.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Growth</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Be part of a growing ecosystem that combines traditional gaming with cryptocurrency innovation.
							</p>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center space-y-6 py-8">
						<p className="text-lg text-neutral-700 dark:text-neutral-300">
							Join us as a founding partner of the Bitcoin Poker Tour and help shape the future of poker and cryptocurrency gaming in Australia.
						</p>
						<a 
							href="mailto:contact@bitcoinpokertour.com"
							className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 animate-gradient"
						>
							Become a Sponsor
						</a>
					</div>

					{/* Current Sponsors Section (if any) */}
					<div className="text-center space-y-6 py-8">
						<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
							Our Current Partners
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
							<div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
								<span className="text-neutral-500">Your Logo Here</span>
							</div>
							<div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
								<span className="text-neutral-500">Your Logo Here</span>
							</div>
							<div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
								<span className="text-neutral-500">Your Logo Here</span>
							</div>
							<div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
								<span className="text-neutral-500">Your Logo Here</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Sponsors;
