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
import { Scanner } from "@yudiel/react-qr-scanner";

const Registration = ({ id }: { id: string }) => {
	const router = useRouter();
	const [event, setEvent] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [btcPrice, setBtcPrice] = useState<number | null>(null);
	const [registrationCount, setRegistrationCount] = useState<any>(null);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState<any>(null);
	const [paymentStatus, setPaymentStatus] = useState<string>('');
	const [showScanner, setShowScanner] = useState(false);

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

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (paymentDetails?.invoiceId) {
			checkPaymentStatus();
			
			intervalId = setInterval(checkPaymentStatus, 5000);
		}

		async function checkPaymentStatus() {
			try {
				const response = await fetch(`/checkregistrationstatus/${paymentDetails.invoiceId}`);
				const data = await response.json();
				
				console.log("Payment status check:", data);
				
				if (data.status === 'Settled') {
					clearInterval(intervalId);
					router.push(`/registration/success/${data.registration_id}`);
				}
				
				setPaymentStatus(data.status);
			} catch (error) {
				console.error('Error checking payment status:', error);
			}
		}

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [paymentDetails?.invoiceId, router]);

	const initVals: IRegisterEvent = {
		evt_id: id.toString(),
		name: "",
		email: "",
		bitcoin_address: ""
	};

	if (loading) {
		return <div className="flex justify-center items-center">Loading...</div>;
	}

	if (!event) {
		return <div className="flex justify-center items-center">Event not found</div>;
	}

	const totalAmount = event.buy_in + event.fee;
	const audTotal = btcPrice ? (totalAmount * btcPrice).toFixed(2) : 'N/A';

	const formatEventDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString('en-AU', { 
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: 'Australia/Brisbane' // Explicitly use Brisbane timezone
		});
	};

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

	const handleScan = (result: string | null, formik: any) => {
		if (result) {
			formik.setFieldValue('bitcoin_address', result);
			setShowScanner(false);
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
						{event && (
							<p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
								{formatEventDate(event.date)}
							</p>
						)}
					</div>

					<Formik
						initialValues={initVals}
						onSubmit={onSubmit}
					>
						{(formikProps) => (
							<>
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
									
									<div className="relative">
										<Field
											className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
											name="bitcoin_address"
											placeholder="Your Bitcoin payout address"
											validate={validateBitcoinAddress}
											required
										/>
										<button
											type="button"
											onClick={() => setShowScanner(true)}
											className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
										>
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</button>
										<ErrorMessage component="a" className="text-red-400" name="bitcoin_address" />
									</div>
									
									<button
										type="submit"
										className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center"
									>
										Register & Pay {totalAmount} BTC (≈ ${audTotal} AUD)
									</button>
								</Form>

								<Dialog open={showScanner} onOpenChange={setShowScanner}>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Scan Bitcoin Address QR Code</DialogTitle>
										</DialogHeader>
										<div className="relative h-64">
											<Scanner
												onScan={(detectedCodes) => {
													const result = detectedCodes[0]?.rawValue ?? null;
													handleScan(result, formikProps);
												}}
												onError={(error) => console.log(error)}
											/>
										</div>
									</DialogContent>
								</Dialog>
							</>
						)}
					</Formik>
				</div>
			</div>

			<Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{paymentStatus === 'Settled' ? 'Payment Confirmed!' : 'Complete Your Payment'}
						</DialogTitle>
					</DialogHeader>
					{paymentDetails && (
						<div className="space-y-4">
							<div className="text-center space-y-2">
								<p className="text-lg font-semibold">
									Status: {paymentStatus || 'Pending'}
								</p>
								<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
									<p className="font-medium">Amount Due:</p>
									<p>{paymentDetails.amount} BTC</p>
									<p className="text-sm text-gray-600">≈ ${(paymentDetails.amount * paymentDetails.btcPrice).toFixed(2)} AUD</p>
								</div>
								{paymentStatus === 'Settled' ? (
									<p className="text-green-600">
										Payment received! Redirecting to confirmation page...
									</p>
								) : (
									<>
										<div className="text-center space-y-4">
											<p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
												Complete your payment using BTCPay Server
											</p>
											<a 
												href={paymentDetails.paymentUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
											>
												Open BTCPay Invoice & Pay
											</a>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												Click the button above to open BTCPay Server with the correct QR code
											</p>
										</div>
										<p className="text-sm text-gray-600 mt-4 text-center">
											Waiting for payment confirmation...
										</p>
									</>
								)}
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default Registration;
