'use client'
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { IEvent, IRegistrations } from "@/types";
import { unstable_noStore } from "next/cache";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatBrisbaneDate } from "@/lib/timezone";

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
				console.log(`Fetching data for event: ${params.slug}`);
				
				const [eventData, registrationsData, statsData, resultsData] = await Promise.all([
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}`, {
						headers: { 'ngrok-skip-browser-warning': 'true' }
					}),
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/registrations/count`, {
						headers: { 'ngrok-skip-browser-warning': 'true' }
					}),
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/stats`, {
						headers: { 'ngrok-skip-browser-warning': 'true' }
					}).catch(err => {
						console.warn('Stats endpoint failed:', err.message);
						return { data: { entries: 0, prize_pool: 0, prize_pool_usd: 0 } };
					}),
					axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.slug}/results`, {
						headers: { 'ngrok-skip-browser-warning': 'true' }
					}).catch(err => {
						console.warn('Results endpoint failed:', err.message);
						return { data: [] };
					})
				]);

				console.log('Event data:', eventData.data);
				console.log('Registrations data:', registrationsData.data);
				console.log('Stats data:', statsData.data);
				console.log('Results data:', resultsData.data);

				setEvent(eventData.data);
				setRegistrations(registrationsData.data.registrations || []);
				setStats(statsData.data);
				setResults(resultsData.data || []);
			} catch (err) {
				setError('Failed to load event data');
				console.error('Error fetching event data:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchEventData();
	}, [params.slug]);

	// Use our centralized Brisbane timezone formatting

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

	const eventDate = formatBrisbaneDate(event.date);

	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-4xl space-y-8">
				<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
					{event.title}
				</h1>

				{/* Registration Status and Button */}
				<div className="text-center space-y-4">
					<div className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-md">
						<p className="text-lg font-medium text-neutral-700 dark:text-neutral-300">
							Current Registrations: <span className="text-orange-500 font-bold">{registrations.length}</span>
						</p>
						{event.max_players && event.max_players > 0 && (
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								Spots remaining: {Math.max(0, event.max_players - registrations.length)}
							</p>
						)}
					</div>
					
					{moment(event.date) > moment() && (
						<Link 
							href={`/registration/${event._id}`}
							className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
						>
							Register Now
						</Link>
					)}
				</div>

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
									<TableCell>{stats?.entries || registrations.length || 0}</TableCell>
								</TableRow>
								<TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
									<TableCell className="font-semibold">Prize Pool</TableCell>
									<TableCell>
										{stats?.prize_pool ? (
											<>
												<span className="text-orange-500">{stats.prize_pool.toFixed(6)} BTC</span> / ${stats.prize_pool_usd?.toFixed(0)} USD
											</>
										) : (
											<span className="text-gray-500">Calculated after payment confirmation</span>
										)}
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
										<span className="text-orange-500">{event.buy_in?.toFixed(6) || '0.000000'}</span> + {event.fee?.toFixed(6) || '0.000000'}
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
					<h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
						Registered Players ({registrations.length})
					</h2>
					<div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
									<TableHead className="text-white font-semibold">Name</TableHead>
									<TableHead className="text-white font-semibold">Status</TableHead>
									<TableHead className="text-white font-semibold">Amount (BTC)</TableHead>
									<TableHead className="text-white font-semibold">Registration Date (Brisbane)</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{registrations.length > 0 ? (
									registrations.map((registration: any, index: number) => (
										<TableRow key={registration._id || index} className="hover:bg-neutral-100 dark:hover:bg-neutral-700">
											<TableCell className="font-medium">{registration.name}</TableCell>
											<TableCell>
												<span className={`px-2 py-1 rounded-full text-sm ${
													registration.status === 'Complete' || registration.btcpay_status === 'Settled'
														? 'bg-green-100 text-green-800' 
														: 'bg-yellow-100 text-yellow-800'
												}`}>
													{registration.btcpay_status || registration.status || 'Pending'}
												</span>
											</TableCell>
											<TableCell>
												<span className="text-orange-500 font-mono">
													{typeof registration.amount === 'number' 
														? registration.amount.toFixed(6) 
														: registration.amount || '0.000000'
													}
												</span>
											</TableCell>
											<TableCell className="text-sm">
												{formatBrisbaneDate(registration.date, 'MMM D, YYYY h:mm A')}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4} className="text-center py-8 text-gray-500">
											No registrations yet - be the first to register!
										</TableCell>
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
