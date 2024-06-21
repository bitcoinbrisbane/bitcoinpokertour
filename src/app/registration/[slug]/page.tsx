
import Forms from "@/components/ui/Forms/Form";
import { getEventById } from "@/lib/utils";


export default async function Register({ params }: { params: { slug: string } }) {
  const {slug} = params;
  const event = await getEventById(slug);
  const {title} = event;
  return (
    <main className="flex max-h-screen w-full flex-col items-center justify-between space-y-5">
      <h1 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100">Register for</h1>
      <h1 className="text-3xl font-bold">{title}</h1>
      <Forms id={slug} />
    </main>
  );
};
