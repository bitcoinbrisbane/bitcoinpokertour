const Bitcoinguide = () => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-12">
				{/* Header Section */}
				<div className="text-center space-y-6">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Bitcoin Guide
					</h1>
					<p className="text-xl text-neutral-700 dark:text-neutral-300">
						Enhance your experience with the Bitcoin Poker Tour by understanding how Bitcoin powers our events.
					</p>
				</div>

				{/* Introduction Card */}
				<div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg">
					<p className="text-lg text-neutral-600 dark:text-neutral-400">
						Whether you're a seasoned Bitcoin user or new to the crypto world, this guide will help you navigate the essentials.
					</p>
				</div>

				{/* Why Bitcoin Section */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Why Bitcoin?</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Security</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Advanced cryptography ensures your funds are safe.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Transparency</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Transactions are recorded on a public ledger, providing full visibility.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Speed</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Fast transaction processing makes for instant payments.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">Efficiency</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Enjoy lower transaction fees compared to traditional banking.
							</p>
						</div>
					</div>
				</div>

				{/* Getting Started Section */}
				<div className="space-y-6">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Getting Started with Bitcoin</h2>
					<div className="space-y-4">
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">1. Create a Wallet</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								For maximum security and control, opt for a self-custody wallet. Hardware wallets like Ledger or Trezor, and software wallets such as Electrum or Wasabi, are popular choices. These wallets give you full control over your private keys.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">2. Buy Bitcoin</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Purchase Bitcoin through a reputable exchange like Coinbase, Kraken, or Binance. Once acquired, transfer your Bitcoin to your self-custody wallet to maintain control over your funds.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">3. Send Bitcoin to Your Wallet</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								Securely store your Bitcoin by transferring it from the exchange to your self-custody wallet. Generate a receiving address within your wallet app and send your Bitcoin to this address. Always double-check the address to avoid errors.
							</p>
						</div>
						<div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
							<h3 className="text-xl font-semibold mb-4 text-orange-500">4. Use Bitcoin</h3>
							<p className="text-neutral-600 dark:text-neutral-400">
								With Bitcoin in your self-custody wallet, you're ready to participate in our poker events. Use your Bitcoin for buy-ins, secure payments, and to enjoy the benefits of transparent and efficient transactions.
							</p>
						</div>
					</div>
				</div>

				{/* Bitcoin in Poker Section */}
				<div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Bitcoin in Poker</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						The Bitcoin Poker Tour leverages the unique advantages of Bitcoin to provide a seamless and innovative poker experience. Secure buy-ins and transparent transactions enhance every aspect of our events.
					</p>
				</div>

				{/* Stay Informed Section */}
				<div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Stay Informed</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						Keep up with the latest Bitcoin news and trends to maximize your cryptocurrency experience. Our Bitcoin Guide is here to support you on your journey.
					</p>
				</div>
			</div>
		</main>
	);
};

export default Bitcoinguide;