"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { createEvent } from "@/lib/utils";
import { IEvent } from "@/types";

const CreateEvent = () => {
	const initVals: IEvent = {
		_id: "0",
		title: "",
		date: "",
		location: "",
		description: "",
		game_type: "No Limit Texas Hold'em",
		fee: 0.00035,
		buy_in: 0.002,
		start_stack: 30000,
		blind_levels: 20
	};

	const router = useRouter();
	return (
		<>
			<div className="sm:w-full md:w-2/4 p-6">
				<Formik
					initialValues={initVals}
					onSubmit={(values: IEvent, { setSubmitting }: FormikHelpers<IEvent>) => {
						console.log(values);
						setTimeout(() => {
							createEvent(values, "").then(response => {
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

						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="title"
							name="title"
							placeholder="Title"
							required
						/>

						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="date"
							name="date"
							placeholder="Date"
							required
						/>

						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="location"
							name="location"
							placeholder="Location"
							required
						/>

						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="description"
							name="description"
							placeholder="Description"
							required
						/>

						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="game_type"
							name="game_type"
							placeholder="Game Type"
							required
						/>

                        <Field
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="buy_in"
                            name="buy_in"
                            placeholder="Buy In"
                            required
                        />

                        <Field
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="fee"
                            name="fee"
                            placeholder="Fee"
                            required
                        />

                        <Field
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="start_stack"
                            name="start_stack"
                            placeholder="Start Stack"
                            required
                        />

                        <Field
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="blind_levels"
                            name="blind_levels"
                            placeholder="Blind Levels"
                            required
                        />

						<button
							type="submit"
							className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center"
						>
							Create Event
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default CreateEvent;
