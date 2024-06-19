"use client";
import { useRouter } from 'next/navigation';
import moment from "moment";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { IEvents, IDates } from '@/types';

const TableRows = ({_id, date, title, description, location, start_stack, game_type, blind_levels}: IEvents) => {
    const router = useRouter();

    return (
        <TableBody className="hover:cursor-pointer border-x-2 border-y-2">
            <TableRow onClick={() => router.push(`/schedule/${_id}`)}>
                <Dates dates={date}/>
                <TableCell className="font-medium">{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{start_stack}</TableCell>
                <TableCell>{blind_levels}</TableCell>
                <TableCell>{game_type}</TableCell>
            </TableRow>
        </TableBody>
    )
}

const Dates = ({ dates }: IDates) => {
	const newDate = moment.parseZone(dates);
	const formatted = newDate.format("L LT");

	if (!moment(dates).isValid()) {
		return <TableCell>Invalid date</TableCell>;
	}
	return <TableCell>{formatted}</TableCell>;
};

export default TableRows;