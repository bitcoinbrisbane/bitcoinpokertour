"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
	const pathname = usePathname();

	return (
		<div className="flex justify-center w-full mb-8">
			<div className="flex flex-wrap justify-center gap-4">
				<Link
					href="/"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Home
				</Link>
				<Link
					href="/schedule"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/schedule"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Schedule
				</Link>
				<Link
					href="/sponsors"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/sponsors"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Sponsors
				</Link>
				<Link
					href="/treasury"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/treasury"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Treasury
				</Link>

				<Link
					href="/bitcoinguide"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/bitcoinguide"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Guide
				</Link>
				<Link
					href="/contact"
					className={`px-4 py-2 rounded-lg transition-colors duration-200 
						${
							pathname === "/contact"
								? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white animate-gradient"
								: "bg-white dark:bg-neutral-800 hover:bg-blue-100 dark:hover:bg-neutral-700"
						}`}
				>
					Contact
				</Link>
			</div>
		</div>
	);
};

export default Menu;
