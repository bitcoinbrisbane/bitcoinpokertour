"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { postRegistration, validateBitcoinAddress, validateEmail } from "@/lib/utils";
import { IRegisterEvent } from "@/types";

const Result = (id: any) => {
	const initVals: IRegisterEvent = {
		evt_id: id,
		name: "",
		email: "",
		bitcoin_address: ""
	};
	const router = useRouter();
	return (
		<>
			<div className="sm:w-full md:w-2/4 p-6">
				<Formik
					initialValues={initVals}
					onSubmit={(values: IRegisterEvent, { setSubmitting }: FormikHelpers<IRegisterEvent>) => {
						setTimeout(() => {
							postRegistration(values).then(response => {
								setSubmitting(false);
								if (response) {
									if (!response.data.third_party_id) {
										console.log("error");
										return;
									}
									try {
										router.push(`https://btcpay.bitcoinpokertour.com/i/${response.data.third_party_id}`);
									} catch (error) {
										console.error("Redirection error:", error);
									}
								}
							});

							// setSubmitting(false);
							// router.push(`/schedule/${newId}`);
						}, 1500);
					}}
				>
					<Form className="max-w-sm mx-auto space-y-5">
						<Field
							className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="name"
							placeholder="Name, Nickname or BNS"
							required
						/>
						<ErrorMessage component="a" className="" name="name" />
						<Field
							className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							id="email"
							name="email"
							placeholder="Email"
							validate={validateEmail}
							required
						/>
						<ErrorMessage component="a" className="mb-2 text-red-400" name="email" />
						<Field
							className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="bitcoin_address"
							placeholder="Your Bitcoin payout address"
							validate={validateBitcoinAddress}
							required
						/>
						<ErrorMessage component="a" className="mb-2 text-red-400" name="bitcoin_address" />
						<button
							type="submit"
							className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center"
						>
							Register
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default Event;
