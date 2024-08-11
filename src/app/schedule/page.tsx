import { Table, TableHeader } from "@/components/ui/table";
import { getEvents, getPreviousEvents } from "@/lib/utils";
import TableRows from "@/components/ui/TableRows";
import TableSchedule from "@/components/ui/TableSchedule";
import { IEvents } from "@/types";
import { unstable_noStore } from "next/cache";
import moment from "moment";

export default async function Page() {
	unstable_noStore();
	const events = await getEvents();
	const past_events = await getPreviousEvents();

	return (
		<main className="flex max-h-screen max-w-screen flex-col items-center justify-between">
			<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-4">Upcoming events</h1>
			<Table className="">
				<TableHeader>
					<TableSchedule />
				</TableHeader>
				{events ? (
					events.map((items: IEvents) => (
						<TableRows
							key={items.title}
							_id={items._id}
							date={moment(items.date).toString()}
							title={items.title}
							description={items.description}
							location={items.location}
							buy_in={items.buy_in}
							start_stack={items.start_stack}
							game_type={items.game_type}
							blind_levels={items.blind_levels}
						/>
					))
				) : (
					<NoRegistrations />
				)}
			</Table>

			{/* <h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-4">Previous events</h1>
			<Table className="">
				<TableHeader>
					<TableSchedule />
				</TableHeader>
				{past_events &&
					past_events.map((items: IEvents) => (
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
			</Table> */}
		</main>
	);
}

const NoRegistrations = () => (
	<>
		<h2 className="font-bold">There are no events, check back later</h2>
	</>
);
