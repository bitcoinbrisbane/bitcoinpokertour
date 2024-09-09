import Registration from "@/components/ui/Forms/Registration";
import { getEventById } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function Register({ params }: { params: { slug: string } }) {
	unstable_noStore();
	const { slug } = params;

	return (
		<main className="flex max-h-screen w-full flex-col items-center justify-between space-y-5">
			<h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">Register an account</h1>
			<h1 className="text-3xl font-bold">{title}</h1>
			<Registration id={slug} />
		</main>
	);
}
