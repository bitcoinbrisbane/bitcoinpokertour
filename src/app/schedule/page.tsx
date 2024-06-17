import Menu from "@/components/ui/menu";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from 'moment'
import { getEvents } from "@/lib/utils";

interface IEvents {
  id: string
  title: string
  description: string
  date: string
  location: string
  start_stack: number
  blind_levels: number
  game_type: string
}

interface IDates {
  dates: string
}

// mock data
const datas = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
];

export default async function Page() {

  const data = await getEvents();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Upcoming events</h1>
      <Table>
        <TableCaption>Upcoming events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start stack</TableHead>
            <TableHead>Blind levels</TableHead>
            <TableHead>Game type</TableHead>
          </TableRow>
        </TableHeader>
        {
          data.map((items: IEvents) => (
            <TableBody key={items.id}>
              <TableRow>
                <Dates dates={items.date} />
                <TableCell className="font-medium">{items.title}</TableCell>
                <TableCell>{items.description}</TableCell>
                <TableCell>
                  {items.location}
                </TableCell>
                <TableCell>{items.start_stack}</TableCell>
                <TableCell>{items.blind_levels}</TableCell>
                <TableCell>{items.game_type}</TableCell>
              </TableRow>
            </TableBody>
          ))
        }

      </Table>
    </main>
  );
}

const Dates = ({ dates }: IDates) => {
  const newDate = moment.parseZone(dates)
  const formated = newDate.format("LLLL")

   if (!moment(dates).isValid()) {
       return <TableCell>Invalid date</TableCell>;
   }
    return (
      <TableCell>{formated}</TableCell>
    )
}