import Image from "next/image";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

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

const addresses = [
  {
    path: "m/84'/0'/0'/0/0",
    address: "bc1qlmw5tr3uz8ahjfpp3f2c9rzakkc4enpedll4r7",
    paymentStatus: "Paid",
    btc: "0.001",
    tx: "",
  },
  {
    path: "m/84'/0'/0'/0/1",
    address: "bc1q688kdz690ygguktu6ld2tqra9kj5jjef3yf499",
    paymentStatus: "Paid",
    btc: "0.001",
    tx: "",
  },
  {
    path: "m/84'/0'/0'/0/2",
    address: "bc1q908gev9jzjawwykfwk3qqjx0uuu7njwf88p4qn",
    paymentStatus: "Paid",
    btc: "0.001",
    tx: "",
  },
];

export default function Treasury() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Menubar>
        <MenubarMenu>
          <MenubarContent>
            <MenubarItem></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/btcpt.svg"
          alt="Bitcoin Poker Tour"
          width={360}
          height={54}
          priority
        />
      </div>

      <div>
        <h2 className="text-4xl text-center text-neutral-900 dark:text-neutral-100">
          Bitcoin Poker Tour Treasury
        </h2>
        <p className="font-semibold text-center text-neutral-700 dark:text-neutral-300">
          All players buy ins are visible on the blockchain. We are fully
          transparent. We use xPub keys to generate addresses for each buy in.
          We do not store any private keys.
        </p>
        <p>We use BIP32 addresses, m/84/0/0/event id/player id</p>
      </div>

      <div>
        <Table>
          <TableCaption>Upcoming events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Path</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.path}>
                <TableCell className="font-medium">{address.path}</TableCell>
                <TableCell>{address.address}</TableCell>
                <TableCell>{address.btc}</TableCell>
                <TableCell className="text-right">
                  {address.paymentStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
