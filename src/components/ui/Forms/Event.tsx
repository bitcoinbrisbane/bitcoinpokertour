"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { createEvent } from "@/lib/utils";
import { INewEvent } from "@/types";
import moment from "moment";

const CreateEvent = () => {
	// One month from now
	const oneMonth = moment().add(1, "months").format("YYYY-MM-DD:18:30");
	const initVals: INewEvent = {
		_id: "0",
		title: "",
		description: "",
		date: oneMonth,
		registration_close: oneMonth,
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
		<>
			<div className="w-full md:w-[90%] lg:w-[85%] p-6 mx-auto">
				<Formik
					initialValues={initVals}
					onSubmit={(values: INewEvent, { setSubmitting }: FormikHelpers<INewEvent>) => {
						setTimeout(() => {
							createEvent(values).then(response => {
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
					<Form className="max-w-sm mx-auto space-y-5">
						<Field
							className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="password"
							placeholder="Password"
							type="password"
							required
						/>

						{/* Tournament Details */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold">Tournament Details</h3>

							<div className="space-y-2">
								<label htmlFor="title" className="block text-sm font-medium">
									Tournament Name
								</label>
								<Field
									className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
									name="title"
									placeholder="e.g., Bitcoin Sunday Special"
									required
								/>
							</div>

							<div className="space-y-2">
								<label htmlFor="description" className="block text-sm font-medium">
									Description
								</label>
								<Field
									as="textarea"
									className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
									name="description"
									placeholder="Describe your exciting tournament..."
									rows={3}
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="date" className="block text-sm font-medium">
										Tournament Date & Time
									</label>
									<Field type="datetime-local" className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700" name="date" required />
								</div>

								<div className="space-y-2">
									<label htmlFor="location" className="block text-sm font-medium">
										Venue Location
									</label>
									<Field className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700" name="location" required />
								</div>
							</div>
						</div>

						{/* Tournament Structure */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold">Tournament Structure</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="game_type" className="block text-sm font-medium">
										Game Type
									</label>
									<Field as="select" className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700" name="game_type" required>
										<option value="No Limit Texas Hold'em">No Limit Texas Hold'em</option>
										<option value="Pot Limit Omaha">Pot Limit Omaha</option>
										<option value="Mixed Game">Mixed Game</option>
									</Field>
								</div>

								<div className="space-y-2">
									<label htmlFor="start_stack" className="block text-sm font-medium">
										Starting Stack
									</label>
									<Field
										type="number"
										className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
										name="start_stack"
										placeholder="e.g., 30000"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="blind_levels" className="block text-sm font-medium">
										Blind Levels (minutes)
									</label>
									<Field
										type="number"
										className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
										name="blind_levels"
										placeholder="e.g., 20"
										required
									/>
								</div>
							</div>
						</div>

						{/* Buy-in Details */}
						<div className="space-y-6">
							<h3 className="text-lg font-semibold">Buy-in Information</h3>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label htmlFor="buy_in" className="block text-sm font-medium">
										Buy-in Amount (BTC)
									</label>
									<Field
										type="number"
										step="0.0001"
										className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
										name="buy_in"
										placeholder="e.g., 0.002"
										required
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="fee" className="block text-sm font-medium">
										Tournament Fee (BTC)
									</label>
									<Field
										type="number"
										step="0.0001"
										className="w-full p-2.5 rounded-lg border bg-gray-50 dark:bg-gray-700"
										name="fee"
										placeholder="e.g., 0.00035"
										required
									/>
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200"
						>
							Create Tournament 🎉
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default CreateEvent;
