const math = require("mathjs");

function calculateDecayConstant(totalPlayers, firstPlacePercentage) {
	// Solve for decay constant k
	const k = -Math.log(firstPlacePercentage * (totalPlayers - 1)) / (totalPlayers - 1);
	return k;
}

function payoutFunction(totalPlayers, place, k) {
	// Non-linear decay function
	const numerator = 0.5 * Math.exp(-k * (place - 1));
	const denominator = Array.from({ length: totalPlayers }, (_, i) => Math.exp(-k * i)).reduce((a, b) => a + b, 0);
	return numerator / denominator;
}

function calculatePayouts(totalPlayers, totalPrizePool, topPercent) {
	const numPaidPlayers = Math.floor(totalPlayers * (topPercent / 100));
	const firstPlacePercentage = 0.5;

	// Calculate decay constant
	const k = calculateDecayConstant(numPaidPlayers, firstPlacePercentage);

	// Calculate payouts for each position
	const payouts = [];
	for (let p = 1; p <= numPaidPlayers; p++) {
		const payout = payoutFunction(numPaidPlayers, p, k) * totalPrizePool;
		payouts.push(payout);
	}

	return payouts;
}

// Example usage:
const totalPlayers = 30;
const totalPrizePool = 6450;
const topPercent = 20;

const payouts = calculatePayouts(totalPlayers, totalPrizePool, topPercent);
console.log(payouts);
