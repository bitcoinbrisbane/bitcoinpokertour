'use client'
import Registration from "@/components/ui/Forms/Registration";
import { getEventById, getEventRegistrationCount } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Register({ params }: { params: { slug: string } }) {
	const [event, setEvent] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [registrationCount, setRegistrationCount] = useState<any>(null);
	const MAX_PLAYERS = 100; // Set constant for max players

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [eventData, countData] = await Promise.all([
					getEventById(params.slug),
					getEventRegistrationCount(params.slug)
				]);
				
				setEvent(eventData);
				setRegistrationCount(countData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		
		fetchData();
	}, [params.slug]);

	if (loading) {
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
				<div className="w-full max-w-7xl space-y-8">
					<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Loading...
					</h1>
				</div>
			</main>
		);
	}

	if (!event) {
		return (
			<main className="flex min-h-screen w-full flex-col items-center p-4">
				<div className="w-full max-w-7xl space-y-8">
					<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Event not found
					</h1>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-7xl space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Register for
					</h1>
					<h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
						{event.title}
					</h2>
					{registrationCount && (
						<div className="text-lg text-gray-600 dark:text-gray-400">
							<p>
								Current Registrations: {registrationCount.total_registrations}
							</p>
							<p>
								Spots remaining: {Math.max(0, MAX_PLAYERS - registrationCount.total_registrations)}
							</p>
						</div>
					)}
				</div>
				<Registration id={params.slug} />
			</div>
		</main>
	);
}
