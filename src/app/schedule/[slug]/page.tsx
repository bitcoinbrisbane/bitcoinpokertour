import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { IEvent, IRegistrations } from "@/types";
import { getEventById, getRegistrations } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function Page({ params }: { params: { slug: string } }) {
	unstable_noStore();
	const { slug } = params;
	const event: IEvent = await getEventById(slug);
	const { title, date, buy_in, fee, description, location, game_type, blind_levels, start_stack, _id } = event;

	const eventDate = getFormattedDate(date);
	const data = await getRegistrations(_id);

	return (
		<main className="flex h-full w-full md:w-3/4 flex-col  justify-between ">
			<div className="text-left py-3 space-y-10 mb-4">
				<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">{title}</h1>
				<Link href={`/registration/${_id}`} className="mt-6">
					<h2 className="w-full text-xl mt-10 font-bold hover:cursor-pointer hover:underline">
						Click here to Register
						<span className="inline-block transition-transform hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
					</h2>
				</Link>
				<dl className="divide-y divide-gray-200">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Location</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{location}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Start</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDate}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-5 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Description</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{description}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Buy In (BTC)</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{buy_in} + {fee}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Stack Size</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{start_stack}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Blind Levels (minutes)</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{blind_levels}</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-md font-bold leading-6 text-gray-900">Game Type</dt>
						<dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{game_type}</dd>
					</div>
				</dl>
				<h2 className="text-xl top-0 font-bold">Entries</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow className="border-x-2 border-y-2">
						<TableHead className="w-[350px] border-x-2">Name</TableHead>
						<TableHead className="w-[350px] border-x-2">BTC Address</TableHead>
						<TableHead className="-[100px] border-x-2">BTC Recieved</TableHead>
						<TableHead className="w-[180px] text-center">Status</TableHead>
					</TableRow>
				</TableHeader>
				{data ? (
					data.map((items: IRegistrations) => (
						<TableBody key={items._id} className="hover:cursor-pointer border-x-2 border-y-2">
							<TableRow>
								<TableCell className="font-medium border-r-2">{items.name}</TableCell>
								<TableCell><a href={`https://btcpay.bitcoinpokertour.com/i/${items.third_party_id}`}>{items.buy_in_address} Click to pay</a></TableCell>
								<TableCell className="font-medium border-x-2">{items.btc_received}</TableCell>
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
		</main>
	);
}

const getFormattedDate = async (date: any) => {
	const momentDate = moment.parseZone(date);
	const formatted = momentDate.format("L LT");
	return formatted ? formatted : "Invalid Date";
};
