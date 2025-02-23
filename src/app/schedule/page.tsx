'use client'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { unstable_noStore } from "next/cache";
import axios from "axios";
import moment from "moment";
import Link from "next/link";

export default async function Page() {
	unstable_noStore();

	try {
		console.log('Fetching events from API...');
		const { data: allEvents } = await axios.get('http://localhost:5001/schedule');
		console.log('Events received:', allEvents);

		// Split events into upcoming and previous
		const now = new Date();
		const upcomingEvents = allEvents.filter((event: any) => new Date(event.date) >= now);
		const previousEvents = allEvents.filter((event: any) => new Date(event.date) < now);

		// Sort events by date
		upcomingEvents.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
		previousEvents.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

		const EventTable = ({ events }: { events: any[] }) => (
			<div className="w-full overflow-x-auto md:overflow-hidden">
				{/* Desktop version */}
				<div className="hidden md:block">
					<Table className="w-full">
						<TableHeader>
							<TableRow className="bg-gray-100 dark:bg-gray-800">
								<TableHead className="w-[200px]">Date</TableHead>
								<TableHead className="w-[200px]">Location</TableHead>
								<TableHead className="w-[150px]">Buy In + Fee</TableHead>
								<TableHead className="w-[100px]">Game</TableHead>
								<TableHead className="w-[100px]">Stack</TableHead>
								<TableHead className="w-[100px]">Levels</TableHead>
								<TableHead className="w-[150px]">Players</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{events.map((event) => (
								<TableRow 
									key={event._id}
									className="hover:bg-gray-50 dark:hover:bg-gray-700"
								>
									<TableCell>
										<Link href={`/schedule/${event._id}`} className="hover:text-blue-500">
											<div className="font-medium">
												{event.title === '0' || event.title === null ? event.description.slice(0, 30) + '...' : event.title}
											</div>
											<div className="text-sm text-gray-500">
												{moment(event.date).format('MMM D, YYYY h:mm A')}
											</div>
										</Link>
									</TableCell>
									<TableCell>{event.location}</TableCell>
									<TableCell>
										<div>{(event.buy_in || 0).toFixed(6)} BTC</div>
										<div className="text-sm text-gray-500">+{(event.fee || 0).toFixed(6)} BTC</div>
									</TableCell>
									<TableCell>{event.game_type}</TableCell>
									<TableCell>{event.start_stack ? event.start_stack.toLocaleString() : 'TBA'}</TableCell>
									<TableCell>{event.blind_levels || 'TBA'} min</TableCell>
									<TableCell>
										{event.max_players > 1000000 ? 'Unlimited' : (event.max_players || 'Unlimited')}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				{/* Mobile version */}
				<div className="md:hidden space-y-4">
					{events.map((event) => (
						<div 
							key={event._id}
							className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 
								rounded-lg shadow-md p-4 space-y-3 hover:border-blue-500 
								transition-all duration-200"
						>
							<Link href={`/schedule/${event._id}`} className="hover:text-blue-500">
								<h3 className="font-semibold text-lg">
									{event.title === '0' || event.title === null ? event.description.slice(0, 30) + '...' : event.title}
								</h3>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{moment(event.date).format('MMM D, YYYY h:mm A')}
								</div>
							</Link>
							
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Location</div>
									<div className="text-gray-600 dark:text-gray-300">{event.location}</div>
								</div>
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Buy In + Fee</div>
									<div className="text-gray-600 dark:text-gray-300">{(event.buy_in || 0).toFixed(6)} BTC</div>
									<div className="text-gray-500 dark:text-gray-400">+{(event.fee || 0).toFixed(6)} BTC</div>
								</div>
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Game</div>
									<div className="text-gray-600 dark:text-gray-300">{event.game_type}</div>
								</div>
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Stack</div>
									<div className="text-gray-600 dark:text-gray-300">
										{event.start_stack ? event.start_stack.toLocaleString() : 'TBA'}
									</div>
								</div>
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Levels</div>
									<div className="text-gray-600 dark:text-gray-300">{event.blind_levels || 'TBA'} min</div>
								</div>
								<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
									<div className="font-medium text-gray-900 dark:text-gray-100">Players</div>
									<div className="text-gray-600 dark:text-gray-300">
										{event.max_players > 1000000 ? 'Unlimited' : (event.max_players || 'Unlimited')}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);

		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
				<div className="w-full max-w-7xl space-y-8">
					<h1 className="text-3xl md:text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">
						Bitcoin Poker Tour Events
					</h1>

					{/* Upcoming Events Section */}
					<section>
						<h2 className="text-xl md:text-2xl font-semibold mb-4">Upcoming Events</h2>
						{upcomingEvents.length === 0 ? (
							<p>No upcoming events scheduled</p>
						) : (
							<EventTable events={upcomingEvents} />
						)}
					</section>

					{/* Previous Events Section */}
					<section>
						<h2 className="text-xl md:text-2xl font-semibold mb-4">Previous Events</h2>
						{previousEvents.length === 0 ? (
							<p>No previous events</p>
						) : (
							<EventTable events={previousEvents} />
						)}
					</section>
				</div>
			</main>
		);
	} catch (error) {
		console.error('Error fetching events:', error);
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
				<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-4">
					Error loading events
				</h1>
				<p>Failed to fetch events. Please try again later.</p>
			</main>
		);
	}
}
