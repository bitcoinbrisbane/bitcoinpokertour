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
				const [eventData, ] = await Promise.all([
					axios.get(`http://localhost:5001/schedule/${params.slug}`),
					// axios.get(`http://localhost:5001/registration/event/${params.slug}`),
					// axios.get(`http://localhost:5001/schedule/${params.slug}/stats`),
					// axios.get(`http://localhost:5001/schedule/${params.slug}/results`)
				]);

				setEvent(eventData.data);
				// setRegistrations(registrationsData.data);
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

	if (loading) {
		return (
			<main className="flex h-full w-full md:w-3/4 flex-col justify-between p-4">
				<div className="text-center">Loading event details...</div>
			</main>
		);
	}

	if (error || !event) {
		return (
			<main className="flex h-full w-full md:w-3/4 flex-col justify-between p-4">
				<div className="text-center text-red-500">
					{error || 'Event not found'}
				</div>
			</main>
		);
	}

	const eventDate = moment(event.date).format('MMM D, YYYY h:mm A');

	return (
		<main className="flex h-full w-full md:w-3/4 flex-col justify-between p-4">
			<div className="text-left py-3 space-y-10 mb-4">
				<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">{event.title}</h1>

				{moment(event.date) > moment() && (
					<Link href={`/registration/${event._id}`} className="mt-6">
						<h2 className="w-60 text-xl mt-10 font-bold hover:cursor-pointer focus:ring hover:underline">
							Click here to Register
							<span className="inline-block transition-transform hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
						</h2>
					</Link>
				)}

				<dl className="divide-y divide-gray-200">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Number of runners</dt>
						{/* <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{stats.entries || 0}</dd> */}
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Prize Pool</dt>
						{/* <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{stats.prize_pool.toFixed(6)} BTC / {stats.prize_pool_usd.toFixed(0)} USD
						</dd> */}
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Location</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.location}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Start</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDate}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Description</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.description}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Buy In (BTC)</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{event.buy_in} + {event.fee}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Stack Size</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.start_stack}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Blind Levels (minutes)</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.blind_levels}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Game Type</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{event.game_type}</dd>
					</div>
				</dl>
			</div>

			<div>
				{results && <h2 className="text-xl top-0 font-bold">Results</h2>}
				{results && (
					<Table>
						<TableHeader>
							<TableRow className="border-x-2 border-y-2">
								<TableHead className="font-medium w-[100px] border-x-2">Place</TableHead>
								<TableHead className="font-medium w-[180px] border-x-2">Name</TableHead>
								<TableHead className="font-medium w-[180px] text-center">On Chain Payout</TableHead>
							</TableRow>
						</TableHeader>
						{results.map((result: any) => (
							<TableBody key={result._id} className="border-x-2 border-y-2">
								<TableRow>
									<TableCell className="border-x-2 lg:w-20">{result.place}</TableCell>
									<TableCell className="border-r-2 lg:w-10">{result.name}</TableCell>
									<TableCell className="border-x-2 lg:w-20">
										{result.payout} BTC sent with TX ID <Link href={`https://mempool.space/tx/${result.tx_id}`}>{result.tx_id}</Link>
									</TableCell>
								</TableRow>
							</TableBody>
						))}
					</Table>
				)}
			</div>

			<div>
				<h2 className="text-xl top-0 font-bold">Runners</h2>
				<Table>
					<TableHeader>
						<TableRow className="border-x-2 border-y-2">
							<TableHead className="w-[180px] border-x-2">Name</TableHead>
							<TableHead className="w-[350px] border-x-2">Buy In Address</TableHead>
							<TableHead className="-[100px] border-x-2">BTC Received</TableHead>
							<TableHead className="w-[180px] text-center">Status</TableHead>
						</TableRow>
					</TableHeader>

					{registrations ? (
						registrations.map((items: IRegistrations) => (
							<TableBody key={items._id} className="border-x-2 border-y-2">
								<TableRow>
									<TableCell className="font-medium border-r-2 md:w-5 lg:w-10">{items.name}</TableCell>
									<TableCell className="flex-row">
										<Link href={`https://mempool.space/address/${items.buy_in_address}`}>
											<span>{items.buy_in_address}</span>
										</Link>
										{/* <div>
											<Link href={`https://mempool.space/address/${items.buy_in_address}`}>
												<span>{items.buy_in_address}</span>
											</Link>
										</div>
										<div className="mt-3 ">
											<Link
												className="p-2 border-2 shadow rounded-3xl hover:bg-blue-400 hover:text-white hover:cursor-pointer"
												href={
													items.status !== "Complete"
														? `https://btcpay.bitcoinpokertour.com/i/${items.third_party_id}`
														: `https://btcpay.bitcoinpokertour.com/i/${items.third_party_id}/receipt/${items._id}`
												}
											>
												{items.status !== "Complete" ? "Click to Pay" : "View Receipt"}
											</Link>
										</div> */}
									</TableCell>
									<TableCell className="font-medium border-x-2 lg:w-20">{items.btc_received}</TableCell>
									<TableCell>{items.status}</TableCell>
								</TableRow>
							</TableBody>
						))
					) : (
						<TableBody key={0} className="hover:cursor-pointer border-x-2 border-y-2">
							<TableRow>
								<TableCell className="font-medium border-r-2">No registration for this event yet</TableCell>
							</TableRow>
						</TableBody>
					)}
				</Table>
			</div>
		</main>
	);
}
