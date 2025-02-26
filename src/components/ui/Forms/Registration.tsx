"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { postRegistration, validateBitcoinAddress, validateEmail, getEventById, getEventRegistrationCount } from "@/lib/utils";
import { IRegisterEvent } from "@/types";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../dialog";
import { QRCodeSVG } from "qrcode.react";

const Registration = ({ id }: { id: string }) => {
	const [event, setEvent] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [btcPrice, setBtcPrice] = useState<number | null>(null);
	const [registrationCount, setRegistrationCount] = useState<any>(null);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [eventData, priceData, countData] = await Promise.all([
					getEventById(id),
					fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=aud')
						.then(res => res.json()),
					getEventRegistrationCount(id)
				]);
				
				setEvent(eventData);
				setBtcPrice(priceData.bitcoin.aud);
				setRegistrationCount(countData);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};
		
		fetchData();
	}, [id]);

	const initVals: IRegisterEvent = {
		evt_id: id.toString(),
		name: "",
		email: "",
		bitcoin_address: ""
	};
	const router = useRouter();

	if (loading) {
		return <div className="flex justify-center items-center">Loading...</div>;
	}

	if (!event) {
		return <div className="flex justify-center items-center">Event not found</div>;
	}

	const totalAmount = event.buy_in + event.fee;
	const audTotal = btcPrice ? (totalAmount * btcPrice).toFixed(2) : 'N/A';

	const onSubmit = async (values: IRegisterEvent, { setSubmitting }: FormikHelpers<IRegisterEvent>) => {
		try {
			const response = await postRegistration(values);
			
			if (response.data.btcpay_invoice_id) {
				setPaymentDetails({
					invoiceId: response.data.btcpay_invoice_id,
					amount: totalAmount,
					btcPrice: btcPrice,
					address: response.data.bitcoin_address,
					paymentUrl: `https://btcpay.bitcoinpokertour.com/i/${response.data.btcpay_invoice_id}`
				});
				setShowPaymentModal(true);
			}
		} catch (error) {
			console.error('Registration error:', error);
		}
	};

	return (
		<>
			<div className="flex justify-center items-center w-full">
				<div className="w-full max-w-md p-6">
					<div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
						<h3 className="text-lg font-semibold mb-2 text-center">Registration Details</h3>
						{registrationCount && (
							<div className="mb-4 text-center">
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Current Registrations: {registrationCount.paid} confirmed
									{registrationCount.pending > 0 && ` (${registrationCount.pending} pending)`}
								</p>
								{event.max_players > 0 && (
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Spots remaining: {Math.max(0, event.max_players - registrationCount.total)}
									</p>
								)}
							</div>
						)}
						<div className="space-y-2">
							<p>Buy-in: {event.buy_in} BTC <span className="text-gray-500">≈ ${(event.buy_in * (btcPrice ?? 0)).toFixed(2)} AUD</span></p>
							<p>Tournament Fee: {event.fee} BTC <span className="text-gray-500">≈ ${(event.fee * (btcPrice ?? 0)).toFixed(2)} AUD</span></p>
							<div className="border-t pt-2 mt-2">
								<p className="text-lg font-bold">Total: {totalAmount} BTC</p>
								<p className="text-md text-gray-500">≈ ${audTotal} AUD</p>
							</div>
						</div>
					</div>

					<Formik
						initialValues={initVals}
						onSubmit={onSubmit}
					>
						<Form className="space-y-5">
							<Field
								className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								name="name"
								placeholder="Name, Nickname or BNS"
								required
							/>
							<ErrorMessage component="a" className="text-red-400" name="name" />
							
							<Field
								className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								id="email"
								name="email"
								placeholder="Email"
								validate={validateEmail}
								required
							/>
							<ErrorMessage component="a" className="text-red-400" name="email" />
							
							<Field
								className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
								name="bitcoin_address"
								placeholder="Your Bitcoin payout address"
								validate={validateBitcoinAddress}
								required
							/>
							<ErrorMessage component="a" className="text-red-400" name="bitcoin_address" />
							
							<button
								type="submit"
								className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center"
							>
								Register & Pay {totalAmount} BTC (≈ ${audTotal} AUD)
							</button>
						</Form>
					</Formik>
				</div>
			</div>

			<Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Complete Your Payment</DialogTitle>
					</DialogHeader>
					{paymentDetails && (
						<div className="space-y-4">
							<div className="text-center space-y-2">
								<p className="text-xl font-bold">Payment Details</p>
								<div className="space-y-1 text-lg">
									<p>Buy-in: {event.buy_in} BTC <span className="text-gray-500">≈ ${(event.buy_in * (btcPrice ?? 0)).toFixed(2)} AUD</span></p>
									<p>Tournament Fee: {event.fee} BTC <span className="text-gray-500">≈ ${(event.fee * (btcPrice ?? 0)).toFixed(2)} AUD</span></p>
									<div className="border-t pt-2 mt-2">
										<p className="text-xl font-bold">Total: {totalAmount} BTC</p>
										<p className="text-gray-500">≈ ${(totalAmount * (btcPrice ?? 0)).toFixed(2)} AUD</p>
									</div>
								</div>
							</div>
							
							<div className="flex justify-center">
								<QRCodeSVG 
									value={paymentDetails.paymentUrl}
									size={256}
								/>
							</div>

							<div className="text-center space-y-2">
								<p className="text-sm text-gray-600">Click address to copy:</p>
								<button 
									onClick={() => {
										navigator.clipboard.writeText(paymentDetails.address);
										alert('Address copied!');
									}}
									className="p-2 bg-gray-100 rounded-lg text-sm font-mono hover:bg-gray-200"
								>
									{paymentDetails.address}
								</button>
							</div>

							<a 
								href={paymentDetails.paymentUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="block text-center mt-4 text-blue-500 hover:text-blue-700"
							>
								Pay on BTCPay Server →
							</a>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Registration;
