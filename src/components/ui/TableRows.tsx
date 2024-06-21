"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import moment from "moment";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IEvents, IDates } from "@/types";

const TableRows = ({ _id, date, title, description, location, start_stack, game_type, blind_levels }: IEvents) => {
	const router = useRouter();

	const size = typeof window !== "undefined" ? window.innerWidth : 0;
	const [windowsWidth, setWindows] = useState(size);

	useEffect(() => {
		const handleResize = () => {
			setWindows(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const midScreen = 830;

	return (
		<TableBody className="hover:cursor-pointer border-x-2 border-y-2">
			<TableRow onClick={() => router.push(`/schedule/${_id}`)}>
				{windowsWidth >= midScreen ? (
					<>
						<Dates dates={date} />
						<TableCell className="font-medium">{title}</TableCell>
						<TableCell>{description}</TableCell>
						<TableCell>{location}</TableCell>
						<TableCell>{start_stack}</TableCell>
						<TableCell>{blind_levels}</TableCell>
						<TableCell>{game_type}</TableCell>
					</>
				) : (
					<>
						<Dates dates={date} />
						<TableCell>{location}</TableCell>
						<TableCell>{start_stack}</TableCell>
					</>
				)}
			</TableRow>
		</TableBody>
	);
};

const Dates = ({ dates }: IDates) => {
	const newDate = moment.parseZone(dates);
	const formatted = newDate.format("L LT");

	if (!moment(dates).isValid()) {
		return <TableCell>Invalid date</TableCell>;
	}
	return <TableCell>{formatted}</TableCell>;
};

export default TableRows;
