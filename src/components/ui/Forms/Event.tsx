"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { createEvent } from "@/lib/utils";
import { INewEvent } from "@/types";
import moment from "moment";
import { formatForDateTimeInput, dateTimeInputToUTCString, nowInBrisbane } from "@/lib/timezone";

const CreateEvent = () => {
	// One month from now in Brisbane timezone
	const oneMonthFromNow = nowInBrisbane().add(1, "months").hour(18).minute(30);
	const oneMonthFormatted = formatForDateTimeInput(oneMonthFromNow.toDate());
	
	const initVals: INewEvent = {
		_id: "0",
		title: "",
		description: "",
		date: oneMonthFormatted,
		registration_close: oneMonthFormatted,
		location: "Unit 12, 62 Bishop St, Kelvin Grove, Brisbane",
		game_type: "No Limit Texas Hold'em",
		fee: 0.00035,
		buy_in: 0.002,
		start_stack: 30000,
		blind_levels: 20,
		password: "password"
	};

	const router = useRouter();
	return (
		<div className="w-full">
			<Formik
				initialValues={initVals}
				onSubmit={(values: INewEvent, { setSubmitting }: FormikHelpers<INewEvent>) => {
					setTimeout(() => {
						// Convert Brisbane times to UTC before sending to API
						const eventData = {
							...values,
							date: dateTimeInputToUTCString(values.date),
							registration_close: dateTimeInputToUTCString(values.registration_close)
						};
						
						createEvent(eventData).then(response => {
							setSubmitting(false);
							// if (response) {
							// 	if (!response.data.third_party_id) {
							// 		console.log("error");
							// 		return;
							// 	}
							// 	try {
							// 		router.push(`https://btcpay.bitcoinpokertour.com/i/${response.data.third_party_id}`);
							// 	} catch (error) {
							// 		console.error("Redirection error:", error);
							// 	}
							// }
							setSubmitting(false);
							// const newId = response?.data._id;
							router.push(`/schedule/`);
						});

						// setSubmitting(false);
						// router.push(`/schedule/${newId}`);
					}, 1500);
				}}
			>
				<Form className="w-full max-w-2xl mx-auto space-y-8">
					<div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg p-6">
						<Field
							className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
							name="password"
							placeholder="Password"
							type="password"
							required
						/>

						{/* Tournament Details */}
						<div className="space-y-6">
							<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Tournament Details</h3>

							<div className="space-y-2">
								<label htmlFor="title" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
									Tournament Name
								</label>
								<Field
									className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
									name="title"
									placeholder="e.g., Bitcoin Sunday Special"
									required
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="description" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
									Description
								</label>
								<Field
									as="textarea"
									className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
									name="description"
									placeholder="Describe your exciting tournament..."
									rows={3}
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="date" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Tournament Date & Time (Brisbane/AEST)
									</label>
									<Field type="datetime-local" className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" name="date" required />
								</div>

								<div className="space-y-2">
									<label htmlFor="location" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Venue Location
									</label>
									<Field className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" name="location" required />
								</div>
							</div>
						</div>

						{/* Tournament Structure */}
						<div className="space-y-6">
							<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Tournament Structure</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="game_type" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Game Type
									</label>
									<Field as="select" className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" name="game_type" required>
										<option value="No Limit Texas Hold'em">No Limit Texas Hold'em</option>
										<option value="Pot Limit Omaha">Pot Limit Omaha</option>
										<option value="Mixed Game">Mixed Game</option>
									</Field>
								</div>

								<div className="space-y-2">
									<label htmlFor="start_stack" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Starting Stack
									</label>
									<Field
										type="number"
										className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
										name="start_stack"
										placeholder="e.g., 30000"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="blind_levels" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Blind Levels (minutes)
									</label>
									<Field
										type="number"
										className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
										name="blind_levels"
										placeholder="e.g., 20"
										required
									/>
								</div>
							</div>
						</div>

						{/* Buy-in Details */}
						<div className="space-y-6">
							<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">Buy-in Information</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="buy_in" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Buy-in Amount (BTC)
									</label>
									<Field
										type="number"
										step="0.0001"
										className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
										name="buy_in"
										placeholder="e.g., 0.002"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="fee" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
										Tournament Fee (BTC)
									</label>
									<Field
										type="number"
										step="0.0001"
										className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
										name="fee"
										placeholder="e.g., 0.00035"
										required
									/>
								</div>
							</div>
						</div>
						<></>

						<button
							type="submit"
							className="w-full py-3 px-6 text-white bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02]"
						>
							Create Tournament 🎉
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default CreateEvent;
