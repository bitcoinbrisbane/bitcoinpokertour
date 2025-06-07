import Link from "next/link";
import moment from "moment";

import { unstable_noStore } from "next/cache";
import CreateEvent from "@/components/ui/Forms/Event";

export default async function Event() {
	unstable_noStore();

	return (
		<main className="flex min-h-screen w-full flex-col items-center p-4">
			<div className="w-full max-w-7xl space-y-8">
				<h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
					Create New Tournament
				</h1>
				<CreateEvent />
			</div>
		</main>
	);
}
