'use client'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { unstable_noStore } from "next/cache";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
	const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
	const [previousEvents, setPreviousEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const adminPassword = localStorage.getItem('admin_password');
		setIsAdmin(adminPassword === '123456');
		
		const fetchEvents = async () => {
			try {
				console.log('Fetching events from API...');
				const { data: allEvents } = await axios.get(`${process.env.NEXT_PUBLIC_API}/schedule`);
				console.log('Events received:', allEvents);

				// Split events into upcoming and previous
				const now = new Date();
				const upcoming = allEvents.filter((event: any) => new Date(event.date) >= now);
				const previous = allEvents.filter((event: any) => new Date(event.date) < now);

				// Sort events by date
				upcoming.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
				previous.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

				setUpcomingEvents(upcoming);
				setPreviousEvents(previous);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching events:', error);
				setLoading(false);
			}
		};

		fetchEvents();
	}, []); // Empty dependency array means this runs once on mount

	if (loading) {
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
				<div className="w-full max-w-7xl space-y-8">
					<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Loading Events...
					</h1>
				</div>
			</main>
		);
	}

	const EventTable = ({ events }: { events: any[] }) => (
		<div className="w-full overflow-hidden rounded-lg shadow-lg">
			{/* Desktop version */}
			<div className="hidden md:block">
				<Table>
					<TableHeader>
						<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
							<TableHead className="text-white font-semibold w-[200px]">Date</TableHead>
							<TableHead className="text-white font-semibold w-[200px]">Location</TableHead>
							<TableHead className="text-white font-semibold w-[150px]">Buy In + Fee</TableHead>
							<TableHead className="text-white font-semibold w-[100px]">Game</TableHead>
							<TableHead className="text-white font-semibold w-[100px]">Stack</TableHead>
							<TableHead className="text-white font-semibold w-[100px]">Levels</TableHead>
							<TableHead className="text-white font-semibold w-[150px]">Players</TableHead>
							{isAdmin && <TableHead className="text-white font-semibold w-[150px]">Admin</TableHead>}
						</TableRow>
					</TableHeader>
					<TableBody>
						{events.map((event) => (
							<TableRow 
								key={event._id}
								className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
							>
								<TableCell>
									<Link href={`/schedule/${event._id}`} className="hover:text-orange-500">
										<div className="font-medium">
											{event.title === '0' || event.title === null ? event.description.slice(0, 30) + '...' : event.title}
										</div>
										<div className="text-sm text-neutral-500">
											{moment(event.date).format('MMM D, YYYY h:mm A')}
										</div>
									</Link>
								</TableCell>
								<TableCell>{event.location}</TableCell>
								<TableCell>
									<div className="font-semibold text-orange-500">{(event.buy_in || 0).toFixed(6)} BTC</div>
									<div className="text-sm text-neutral-500">+{(event.fee || 0).toFixed(6)} BTC</div>
								</TableCell>
								<TableCell>{event.game_type}</TableCell>
								<TableCell>{event.start_stack ? event.start_stack.toLocaleString() : 'TBA'}</TableCell>
								<TableCell>{event.blind_levels || 'TBA'} min</TableCell>
								<TableCell>
									{event.max_players > 1000000 ? 'Unlimited' : (event.max_players || 'Unlimited')}
								</TableCell>
								{isAdmin && (
									<TableCell>
										<Link 
											href={`/event/${event._id}`}
											className="text-blue-500 hover:text-orange-500"
											target="_blank"
										>
											View Registrations
										</Link>
									</TableCell>
								)}
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
						className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
							rounded-lg shadow-lg p-4 space-y-3 hover:border-orange-500 
							transition-all duration-200"
					>
						<Link href={`/schedule/${event._id}`} className="hover:text-orange-500">
							<h3 className="font-semibold text-lg">
								{event.title === '0' || event.title === null ? event.description.slice(0, 30) + '...' : event.title}
							</h3>
							<div className="text-sm text-neutral-500 dark:text-neutral-400">
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
						
						{isAdmin && (
							<div className="bg-white dark:bg-gray-700 p-3 rounded-md">
								<Link 
									href={`/event/${event._id}`}
									className="text-blue-500 hover:text-orange-500 block text-center"
									target="_blank"
								>
									View Registrations
								</Link>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);

	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-7xl space-y-8">
				<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
					Bitcoin Poker Tour Events
				</h1>

				{/* Upcoming Events Section */}
				<section>
					<h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
						Upcoming Events
					</h2>
					{upcomingEvents.length === 0 ? (
						<p>No upcoming events scheduled</p>
					) : (
						<EventTable events={upcomingEvents} />
					)}
				</section>

				{/* Previous Events Section */}
				<section>
					<h2 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
						Previous Events
					</h2>
					{previousEvents.length === 0 ? (
						<p>No previous events</p>
					) : (
						<EventTable events={previousEvents} />
					)}
				</section>
			</div>
		</main>
	);
}
