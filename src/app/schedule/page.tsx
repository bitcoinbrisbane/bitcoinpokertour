import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getEvents } from "@/lib/utils";
import TableRows from "@/components/ui/TableRows";
import { IEvents } from "@/types";


export default async function Page() {
	const data = await getEvents();

	return (
		<main className="flex max-h-screen w-full flex-col items-center justify-between">
			<h1 className="text-4xl font-bold text-center mb-4">Upcoming events</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[180px]">Date</TableHead>
						<TableHead className="w-[120px]">Title</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Location</TableHead>
						<TableHead>Start stack</TableHead>
						<TableHead>Blind levels</TableHead>
						<TableHead>Game type</TableHead>
					</TableRow>
				</TableHeader>
				{data.map((items: IEvents) => (
					<TableRows
						key={items.title}
						_id={items._id}
						date={items.date}
						title={items.title}
						description={items.description}
						location={items.location}
						start_stack={items.start_stack}
						game_type={items.game_type}
						blind_levels={items.blind_levels}
					/>
				))}
			</Table>
		</main>
	);
}