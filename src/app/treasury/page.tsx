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
		<main className="flex flex-col items-center justify-center w-full px-4">
			<div className="max-w-4xl w-full space-y-10">
				<div className="text-center space-y-6">
					<h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
						Bitcoin Poker Tour Treasury
					</h2>
					<p className="text-lg text-neutral-700 dark:text-neutral-300">
						All players buy-ins are visible on the blockchain. We are fully transparent.
					</p>
					<p className="text-md text-neutral-600 dark:text-neutral-400">
						We use BIP32 addresses: m/84/0/0/event_id/player_id
					</p>
				</div>

				<div className="w-full overflow-hidden rounded-lg shadow-lg">
					<Table>
						<TableHeader>
							<TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
								<TableHead className="text-white font-semibold">Path</TableHead>
								<TableHead className="text-white font-semibold">Address</TableHead>
								<TableHead className="text-white font-semibold">Amount</TableHead>
								<TableHead className="text-white font-semibold text-right">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{addresses.map(address => (
								<TableRow 
									key={address.path}
									className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
								>
									<TableCell className="font-medium">{address.path}</TableCell>
									<TableCell className="font-mono text-sm">
										{address.address}
									</TableCell>
									<TableCell>
										<span className="font-semibold text-orange-500">
											{address.btc} BTC
										</span>
									</TableCell>
									<TableCell className="text-right">
										<span className={`px-2 py-1 rounded-full text-sm ${
											address.paymentStatus === "Paid" 
												? "bg-green-100 text-green-800" 
												: "bg-yellow-100 text-yellow-800"
										}`}>
											{address.paymentStatus}
										</span>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</main>
	);
}
