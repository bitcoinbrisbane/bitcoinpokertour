import Link from "next/link";
import moment from "moment";

import { unstable_noStore } from "next/cache";
import CreateEvent from "@/components/ui/Forms/Event";

export default async function Event() {
	unstable_noStore();

	return (
		<main className="flex max-h-screen w-full flex-col items-center justify-between space-y-5">
			<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">Create a new event</h1>
			<CreateEvent />
		</main>
	);
}
