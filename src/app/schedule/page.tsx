import { Table, TableHeader } from "@/components/ui/table";
import { getEvents } from "@/lib/utils";
import TableRows from "@/components/ui/TableRows";
import TableSchedule from "@/components/ui/TableSchedule";
import { IEvents } from "@/types";
import { unstable_noStore } from "next/cache";

export default async function Page() {
	unstable_noStore();
	const data = await getEvents();

	return (
		<main className="flex max-h-screen max-w-screen flex-col items-center justify-between">
			<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-4">
				{data && data.length > 0 ? "Upcoming events" : "No scheduled events"}
			</h1>

			{data && data.length > 0 && (
				<Table className="">
					<TableHeader>
						<TableSchedule />
					</TableHeader>
					{data ? (
						data.map((items: IEvents) => (
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
						))
					) : (
						<NoRegistrations />
					)}
				</Table>
			)}
		</main>
	);
}

const NoRegistrations = () => (
	<>
		<h2 className="font-bold">There are no events, check back later</h2>
	</>
);
