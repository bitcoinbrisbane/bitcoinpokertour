const Inscriptions = () => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-12">
				{/* Header Section */}
				<div className="text-center space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Bitcoin Inscriptions
					</h1>
					<p className="text-xl text-neutral-700 dark:text-neutral-300">
						Winners immortalized on the Bitcoin blockchain forever.
					</p>
				</div>

				{/* Introduction Card */}
				<div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg">
					<p className="text-lg text-neutral-600 dark:text-neutral-400">
						Every winner of a Bitcoin Poker Tour event gets their victory permanently inscribed on the Bitcoin blockchain - a digital trophy that lasts forever.
					</p>
				</div>

				{/* What are Inscriptions Section */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">What are Bitcoin Inscriptions?</h2>
					<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
						<p className="text-neutral-600 dark:text-neutral-400 mb-4">
							Bitcoin Inscriptions are a way to embed data directly into the Bitcoin blockchain, creating permanent, immutable records. Think of them as digital artifacts that can never be altered or deleted.
						</p>
						<p className="text-neutral-600 dark:text-neutral-400">
							When you win a Bitcoin Poker Tour event, your achievement gets inscribed onto Bitcoin, making you part of blockchain history forever.
						</p>
					</div>
				</div>

				{/* Benefits Section */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Why Inscriptions Matter</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Permanent</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Your victory is recorded forever on the most secure blockchain in the world.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Verifiable</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Anyone can verify your win using blockchain explorers - no central authority needed.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Unique</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Each inscription is one-of-a-kind and tied to a specific Bitcoin transaction.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Collectible</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Your inscription becomes a digital collectible that can be owned and transferred.
							</p>
						</div>
					</div>
				</div>

				{/* Coming Soon */}
				<div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Coming Soon</h2>
					<p className="text-neutral-600 dark:text-neutral-400 mb-6">
						We're working on implementing our inscription system. Soon, every tournament winner will receive their personalized Bitcoin inscription as proof of their victory.
					</p>
					<div className="inline-flex items-center space-x-2 text-orange-500">
						<span className="text-2xl">🏆</span>
						<span className="font-semibold">Win. Play. Inscribe.</span>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Inscriptions; 