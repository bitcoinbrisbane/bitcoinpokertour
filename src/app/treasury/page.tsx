import Image from "next/image";
import Menu from "@/components/ui/menu";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const addresses = [
	{
		path: "m/84'/0'/0'/0/0",
		address: "bc1qlmw5tr3uz8ahjfpp3f2c9rzakkc4enpedll4r7",
		paymentStatus: "Paid",
		btc: "0.001",
		tx: ""
	},
	{
		path: "m/84'/0'/0'/0/1",
		address: "bc1q688kdz690ygguktu6ld2tqra9kj5jjef3yf499",
		paymentStatus: "Paid",
		btc: "0.001",
		tx: ""
	},
	{
		path: "m/84'/0'/0'/0/2",
		address: "bc1q908gev9jzjawwykfwk3qqjx0uuu7njwf88p4qn",
		paymentStatus: "Paid",
		btc: "0.001",
		tx: ""
	}
];

export default function Treasury() {
	return (
		<main className="flex h-full w-full md:w-3/4 flex-col  justify-between">
			<div className="space-y-10">
				<h2 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">Bitcoin Poker Tour Treasury</h2>
				<p className="text-center text-neutral-700 dark:text-neutral-300">
					All players buy ins are visible on the blockchain. We are fully transparent. We use xPub keys to generate addresses for each buy in.
				</p>
				<p className="text-center text-neutral-700 dark:text-neutral-300">We use BIP32 addresses, m/84/0/0/event id/player id</p>
			</div>

			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Path</TableHead>
							<TableHead>Address</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead className="text-right">Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{addresses.map(address => (
							<TableRow key={address.path}>
								<TableCell className="font-medium">{address.path}</TableCell>
								<TableCell>{address.address}</TableCell>
								<TableCell>{address.btc}</TableCell>
								<TableCell className="text-right">{address.paymentStatus}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
