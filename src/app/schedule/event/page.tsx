import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableRows from "@/components/ui/TableRow";
//import { getEventById } from "@/lib/utils";

//Mocking data
const data = [
    {
        name: "Dog",
        email: "dog4@dog.com",
        date: "2024-06-04T05:06:45.793Z",
        event_id: "665e8fcc4666b3aebb756774",
        _id: "665ea0e5f5e1050635906e2e",
        __v: 0,
        bitcoin_address: "tb1qugnsszut6dm6ggj8ut45tg83tklfcsqwv4l39q"
    },
    {
        name: "Cat",
        email: "cat4@cat4.com",
        date: "2024-06-03T05:06:45.793Z",
        event_id: "665e8fcc4666b3aebb756774",
        _id: "665ea0e5f5e1050635906e2e",
        __v: 0.1,
        bitcoin_address: "tb1qugnsszut6dm6ggj8ut45tg83tklfcsqwv4l39q"
    },
]

//Interface for this page

interface IEvent {
    name: string
    email: string
    date: string
    event_id: string
    _id: string
    __v: number
    bitcoin_address: string
}

//{ params }: { params: { slug: string } }
export default async function Page() {
    //const { slug } = params;
    //const event = await getEventById(slug)

    return (
        <main className="flex max-h-screen w-3/4 flex-col  justify-between ">
            <div className="text-left py-3 space-y-10 mb-4">
                <h1 className="text-4xl font-bold">The Satoshi Main Event</h1>
                <h2 className="text-xl font-bold">Event Number 1</h2>
                <h4>0.01 BTC</h4>
                <h4>40,000 Stacks, <span>30min Levels</span></h4>
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
                {data.map((items: IEvent) => (
                    <TableBody key={items.event_id} className="hover:cursor-pointer border-x-2 border-y-2">
                        <TableRow>{/*/${id}*/}
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

}
