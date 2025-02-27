"use client";
import { useEffect, useState } from "react";

interface CountdownProps {
	newTarget: string;
}

const Countdown = ({ newTarget }: CountdownProps) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	useEffect(() => {
		console.log("Target date received:", newTarget);

		const calculateTimeLeft = () => {
			const difference = +new Date(newTarget) - +new Date();

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((difference / 1000 / 60) % 60),
					seconds: Math.floor((difference / 1000) % 60)
				});
			}
		};

		// Calculate immediately
		calculateTimeLeft();

		// Update every second
		const timer = setInterval(calculateTimeLeft, 1000);

		// Cleanup interval on component unmount
		return () => clearInterval(timer);
	}, [newTarget]);

	return (
		<div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
			<div className="flex justify-center items-center space-x-2 sm:space-x-4 md:space-x-8 py-4 sm:py-8">
				<div className="text-center">
					<div className="text-2xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">{timeLeft.days}</div>
					<div className="text-xs sm:text-sm uppercase tracking-wide">Days</div>
				</div>
				<div className="text-2xl sm:text-4xl md:text-6xl font-bold">:</div>
				<div className="text-center">
					<div className="text-2xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">{timeLeft.hours}</div>
					<div className="text-xs sm:text-sm uppercase tracking-wide">Hours</div>
				</div>
				<div className="text-2xl sm:text-4xl md:text-6xl font-bold">:</div>
				<div className="text-center">
					<div className="text-2xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">{timeLeft.minutes}</div>
					<div className="text-xs sm:text-sm uppercase tracking-wide">Minutes</div>
				</div>
				<div className="text-2xl sm:text-4xl md:text-6xl font-bold">:</div>
				<div className="text-center">
					<div className="text-2xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">{timeLeft.seconds}</div>
					<div className="text-xs sm:text-sm uppercase tracking-wide">Seconds</div>
				</div>
			</div>
		</div>
	);
};

export default Countdown;
