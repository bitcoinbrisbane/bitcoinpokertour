"use client";
import { useState, useEffect } from "react";
import { TableHead, TableRow } from "@/components/ui/table";

const TableSchedule = () => {

    const [windows, setWindows] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            setWindows({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const { width } = windows;
    const midScreen = 830

    return (
        <>
            {
                width > midScreen ? (
                    <TableRow>
                        <TableHead className="w-[180px]">Date</TableHead>
                        <TableHead className="w-[120px]">Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Start stack</TableHead>
                        <TableHead>Blind levels</TableHead>
                        <TableHead>Game type</TableHead>
                    </TableRow>
                ) : (
                    <TableRow>
                        <TableHead className="w-[180px]">Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Start stack</TableHead>
                    </TableRow>
                )

            }

        </>
    )
}

export default TableSchedule;