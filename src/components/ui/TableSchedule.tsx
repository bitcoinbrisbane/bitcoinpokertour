"use client";
import { useState, useEffect } from "react";
import { TableHead, TableRow } from "@/components/ui/table";

const TableSchedule = () => {
    const size = typeof window !== 'undefined' ? window.innerWidth : 0;
    const [windowsWidth, setWindows] = useState(size);

    useEffect(() => {
        const handleResize = () => {
            setWindows(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const midScreen = 830;

    return (
        <>
            {
                windowsWidth > midScreen ? (
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