import { Table, TableHeader } from "@/components/ui/table";
import { getEvents, getPastEvents } from "@/lib/utils";
import TableRows from "@/components/ui/TableRows";
import TableSchedule from "@/components/ui/TableSchedule";
import { IEvents } from "@/types";
import { unstable_noStore } from "next/cache";

export default async function Page() {
	unstable_noStore();

	const [events, pastEvents] = await Promise.all([getEvents(), getPastEvents()]);

	return (
		<main className="flex max-h-screen max-w-screen flex-col items-center justify-between">
			<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-4">
				{events && events.length > 0 ? "Upcoming events" : "No scheduled events"}
			</h1>

			{events && events.length === 0 && <NoRegistrations />}

			{events && events.length > 0 && (
				<Table className="">
					<TableHeader>
						<TableSchedule />
					</TableHeader>
					{events &&
						events.map((items: IEvents) => (
							<TableRows
								key={items.title}
								_id={items._id}
								date={items.date}
								title={items.title}
								description={items.description}
								location={items.location}
								buy_in={items.buy_in}
								start_stack={items.start_stack}
								game_type={items.game_type}
								blind_levels={items.blind_levels}
							/>
						))}
				</Table>
			)}

			<h2 className="text-2xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mt-4">Previous events</h2>

			{pastEvents && pastEvents.length > 0 && (
				<Table className="">
					<TableHeader>
						<TableSchedule />
					</TableHeader>
					{pastEvents &&
						pastEvents.map((items: IEvents) => (
							<TableRows
								key={items.title}
								_id={items._id}
								date={items.date}
								title={items.title}
								description={items.description}
								location={items.location}
								buy_in={items.buy_in}
								start_stack={items.start_stack}
								game_type={items.game_type}
								blind_levels={items.blind_levels}
							/>
						))}
				</Table>
			)}
		</main>
	);
}

const NoRegistrations = () => (
	<>
		<h2>There are no scheduled events, check back later or joint our Telegram group.</h2>
	</>
);
