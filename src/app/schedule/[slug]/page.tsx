'use client'
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { IEvent, IRegistrations } from "@/types";
import { unstable_noStore } from "next/cache";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
	unstable_noStore();
	const [event, setEvent] = useState<IEvent | null>(null);
	const [registrations, setRegistrations] = useState<IRegistrations[]>([]);
	const [results, setResults] = useState<any[]>([]);
	const [stats, setStats] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEventData = async () => {
			try {
				const [eventData, registrationsData] = await Promise.all([
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}`),
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/registrations/count`),
					// axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/stats`),
					// axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/results`)
				]);

				setEvent(eventData.data);
				setRegistrations(registrationsData.data.registrations || []);
				// setStats(statsData.data);
				// setResults(resultsData.data);
			} catch (err) {
				setError('Failed to load event data');
				console.error('Error fetching event data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchEventData();
	}, [params.slug]);

	// Add this function to format dates in Brisbane timezone
	const formatEventDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-AU', { 
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: 'Australia/Brisbane' // Explicitly use Brisbane timezone
		});
	};

	if (loading) {
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
                <div className="w-full max-w-4xl">
                    <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
                        Loading Event Details...
                    </h1>
                </div>
            </main>
		);
	}

	if (error || !event) {
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="text-center text-red-500 text-xl font-semibold">
                        {error || 'Event not found'}
                    </div>
                </div>
            </main>
		);
	}

	const eventDate = formatEventDate(event.date);

	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-8">
				<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
					{event.title}
				</h1>

				{moment(event.date) > moment() && (
					<div className="text-center">
						<Link 
							href={`/registration/${event._id}`}
							className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
						>
							Register Now
						</Link>
					</div>
				)}

				<div className="space-y-4">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Tournament Details</h2>
					<div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
									<TableHead className="text-white font-semibold">Detail</TableHead>
									<TableHead className="text-white font-semibold">Value</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Number of runners</TableCell>
									<TableCell>{stats?.entries || 0}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Prize Pool</TableCell>
									<TableCell>
										<span className="text-orange-500">{stats?.prize_pool?.toFixed(6)} BTC</span> / {stats?.prize_pool_usd?.toFixed(0)} USD
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Location</TableCell>
									<TableCell>{event.location}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Start</TableCell>
									<TableCell>{eventDate}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Description</TableCell>
									<TableCell>{event.description}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Buy In (BTC)</TableCell>
									<TableCell>
										<span className="text-orange-500">{event.buy_in}</span> + {event.fee}
									</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Stack Size</TableCell>
									<TableCell>{event.start_stack}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Blind Levels</TableCell>
									<TableCell>{event.blind_levels} minutes</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Game Type</TableCell>
									<TableCell>{event.game_type}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</div>

				{results && results.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Results</h2>
						<div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
							<Table>
								<TableHeader>
									<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
										<TableHead className="text-white font-semibold">Place</TableHead>
										<TableHead className="text-white font-semibold">Name</TableHead>
										<TableHead className="text-white font-semibold text-center">Payout</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{results.map((result: any) => (
										<TableRow key={result._id} className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
											<TableCell>{result.place}</TableCell>
											<TableCell>{result.name}</TableCell>
											<TableCell className="text-center">
												<span className="text-orange-500">{result.payout} BTC</span>
												{result.tx_id && (
													<Link 
														href={`https://mempool.space/tx/${result.tx_id}`}
														className="ml-2 text-blue-500 hover:underline"
														target="_blank"
													>
														View Transaction
													</Link>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}

				<div className="space-y-4">
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">Registered Players</h2>
					<div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
									<TableHead className="text-white font-semibold">Name</TableHead>
									<TableHead className="text-white font-semibold">Status</TableHead>
									<TableHead className="text-white font-semibold">Amount (BTC)</TableHead>
									<TableHead className="text-white font-semibold">Registration Date</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{registrations.length > 0 ? (
									registrations.map((registration: any, index: number) => (
										<TableRow key={index} className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
											<TableCell>{registration.name}</TableCell>
											<TableCell>{registration.status}</TableCell>
											<TableCell>
												<span className="text-orange-500">{registration.amount}</span>
											</TableCell>
											<TableCell>{formatEventDate(registration.date)}</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4} className="text-center">No registrations yet</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</main>
	);
}
