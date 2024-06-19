import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { IEvent, IRegistrations } from "@/types";
import { getEventById, getRegistrations } from "@/lib/utils";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const event: IEvent = await getEventById(slug)
    const {title, date, __v, description,location, game_type, blind_levels, start_stack, _id} = event 
    const newDate = getFormattedDate(date)

    const data = await getRegistrations(_id);
    return (
        <main className="flex h-full w-full md:w-3/4 flex-col  justify-between ">
            <div className="text-left py-3 space-y-10 mb-4">
                <h1 className="text-4xl font-bold">{title}</h1>
                <h2 className="text-xl font-bold">{location}</h2>
                <h2 className="text-xl font-bold">{newDate}</h2>
                <h2 className="text-lg font-bold">{description}</h2>
                <h4>{__v} BTC</h4>
                <h4>{start_stack} Stacks, <span>{blind_levels} Levels</span></h4>
                <h4>{game_type}</h4>
                <h2 className="text-xl font-bold">Entries</h2>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="border-x-2 border-y-2">
                        <TableHead className="w-[350px] border-x-2" >Name</TableHead>
                        <TableHead className="w-[350px] border-x-2">Address</TableHead>
                        <TableHead className="border-x-2">BTC</TableHead>
                        <TableHead className="w-[180px] text-center">Tx</TableHead>
                    </TableRow>
                </TableHeader>
                {data.map((items: IRegistrations) => (
                    <TableBody key={items._id} className="hover:cursor-pointer border-x-2 border-y-2">
                        <TableRow>
                            <TableCell className="font-medium border-r-2">{items.name}</TableCell>
                            <TableCell>{items.bitcoin_address}</TableCell>
                            <TableCell className="font-medium border-x-2" >{items.__v}</TableCell>
                            <TableCell>0x00</TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </main>
    )
};

const getFormattedDate = ({ dates }: any) => {
	const newDate = moment.parseZone(dates);
	const formatted = newDate.format("L LT");
    return formatted ? formatted : "Invalid Date";
}