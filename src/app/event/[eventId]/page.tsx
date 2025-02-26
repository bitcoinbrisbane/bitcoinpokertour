'use client'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";

interface IEvent {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    buy_in: number;
    fee: number;
    start_stack: number;
    blind_levels: number;
    game_type: string;
    max_players: number;
}

export default function EventRegistrations({ params }: { params: { eventId: string } }) {
    const [event, setEvent] = useState<IEvent | null>(null);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventResponse, registrationsResponse] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API}/schedule/${params.eventId}`, {
                        headers: { 'ngrok-skip-browser-warning': 'true' }
                    }),
                    axios.get(`${process.env.NEXT_PUBLIC_API}/registration/${params.eventId}`, {
                        headers: { 'ngrok-skip-browser-warning': 'true' }
                    })
                ]);

                setEvent(eventResponse.data);
                const registrationsData = Array.isArray(registrationsResponse.data) 
                    ? registrationsResponse.data 
                    : [registrationsResponse.data];
                setRegistrations(registrationsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load event data');
                setLoading(false);
            }
        };

        fetchData();
    }, [params.eventId]);

    if (loading) {
        return (
            <main className="flex min-h-screen w-full flex-col items-center p-4">
                <div className="w-full max-w-7xl">
                    <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
                        Loading Event Details...
                    </h1>
                </div>
            </main>
        );
    }

    if (error || !event) {
        return (
            <main className="flex min-h-screen w-full flex-col items-center p-4">
                <div className="text-red-500">{error || 'Event not found'}</div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen w-full flex-col items-center p-4">
            <div className="w-full max-w-7xl space-y-8">
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient">
                    {event.title || 'Event Details'}
                </h1>

                {/* Event Details Section */}
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Event Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Date</p>
                            <p className="font-semibold">{moment(event.date).format('MMM D, YYYY h:mm A')}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Location</p>
                            <p className="font-semibold">{event.location}</p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Buy-in + Fee</p>
                            <p className="font-semibold text-orange-500">
                                {event.buy_in} BTC + {event.fee} BTC
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Starting Stack</p>
                            <p className="font-semibold">
                                {event.start_stack ? event.start_stack.toLocaleString() : 'TBA'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Blind Levels</p>
                            <p className="font-semibold">
                                {event.blind_levels || 'TBA'} minutes
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Game Type</p>
                            <p className="font-semibold">
                                {event.game_type || 'TBA'}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400">Max Players</p>
                            <p className="font-semibold">
                                {event.max_players ? (event.max_players > 1000000 ? 'Unlimited' : event.max_players) : 'TBA'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Registrations Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Registered Players</h2>
                    <div className="w-full overflow-hidden rounded-lg shadow-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                                    <TableHead className="text-white font-semibold">Name</TableHead>
                                    <TableHead className="text-white font-semibold">Email</TableHead>
                                    <TableHead className="text-white font-semibold">Registration Date</TableHead>
                                    <TableHead className="text-white font-semibold">Bitcoin Address</TableHead>
                                    <TableHead className="text-white font-semibold">Amount</TableHead>
                                    <TableHead className="text-white font-semibold">BTC Received</TableHead>
                                    <TableHead className="text-white font-semibold">BTCPay Status</TableHead>
                                    <TableHead className="text-white font-semibold">Payment Date</TableHead>
                                    <TableHead className="text-white font-semibold">Invoice ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {registrations.length > 0 ? (
                                    registrations.map((registration) => (
                                        <TableRow 
                                            key={registration._id}
                                            className="hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                                        >
                                            <TableCell>{registration.name}</TableCell>
                                            <TableCell>{registration.email}</TableCell>
                                            <TableCell>
                                                {moment(registration.date).format('MMM D, YYYY h:mm A')}
                                            </TableCell>
                                            <TableCell>
                                                <Link 
                                                    href={`https://mempool.space/address/${registration.bitcoin_address}`}
                                                    target="_blank"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {registration.bitcoin_address}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-orange-500">
                                                    {registration.amount} {registration.currency}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-orange-500">
                                                    {registration.btc_received || 0} BTC
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    registration.btcpay_status === 'Settled' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {registration.btcpay_status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {registration.paid_date 
                                                    ? moment(registration.paid_date).format('MMM D, YYYY h:mm A')
                                                    : '-'
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {registration.btcpay_invoice_id ? (
                                                    <Link 
                                                        href={`https://btcpay.bitcoinpokertour.com/i/${registration.btcpay_invoice_id}`}
                                                        target="_blank"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {registration.btcpay_invoice_id.substring(0, 8)}...
                                                    </Link>
                                                ) : '-'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-4">
                                            No registrations found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </main>
    );
} 