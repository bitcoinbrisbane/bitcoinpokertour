"use client";
import { useState, useEffect } from "react";
import moment from "moment-timezone";

interface CountdownState {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const useCountdown = (targetDate: Date): CountdownState => {
	const [countDown, setCountDown] = useState<CountdownState>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	  });

	  const tenHrs = 36000000;

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const delta = targetDate.getTime() - now.getTime();
			const diff = delta - tenHrs; 

			if (delta < 0) {
				clearInterval(intervalId);
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			setCountDown({ days, hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(intervalId);
	}, [targetDate]);

	return countDown;
	 
}

const Countdown = ({ newTarget }: any) => {
	const targetDate = new Date(newTarget);
	const { days, hours, minutes, seconds } = useCountdown(targetDate);

	return (
		<div className="h-1/4 sm:w-full md:w-5/6 text-center border-y-2 border-black  mt-5">
			<ul id="countdownul" className="justify-items-center ">
				<li id="days">
					<div className="number">{days}</div>
					<div className="label">Days</div>
				</li>
				<li id="hours">
					<div className="number">{hours}</div>
					<div className="label">Hours</div>
				</li>
				<li id="minutes">
					<div className="number">{minutes}</div>
					<div className="label">Minutes</div>
				</li>
				<li id="seconds">
					<div className="number">{seconds}</div>
					<div className="label">Seconds</div>
				</li>
			</ul>
		</div>
	);
};

export default Countdown;

/* 
const timeZone = moment.tz.guess();
			const currentTime = moment().tz(timeZone).valueOf();
			const eventTime = moment(targetDate).tz('Australia/Brisbane').valueOf();
			let diffTime = eventTime - currentTime;
			diffTime += 100000000;

			if (diffTime <= 0) {
				clearInterval(intervalId);
			}
	
			setCountDown({
				days: Math.floor(diffTime / (1000 * 60 * 60 * 24)),
				hours: Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((diffTime % (1000 * 60)) / 1000),
			  });

		}, 1000);

		return () => clearInterval(intervalId);
	}, [targetDate]);

	return countDown; */