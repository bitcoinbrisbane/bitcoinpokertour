"use client";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { postCreateAccount, postRegistration, validateBitcoinAddress, validateEmail } from "@/lib/utils";
import { INewPlayer } from "@/types";

const Registration = (id: any) => {
	const initVals: INewPlayer = {
		name: "",
		email: "",
		password: "",
		bitcoin_address: "",
	};
	const router = useRouter();
	return (
		<>
			<div className="sm:w-full md:w-2/4 p-6">
				<Formik
					initialValues={initVals}
					onSubmit={(values: INewPlayer, { setSubmitting }: FormikHelpers<INewPlayer>) => {
						setTimeout(() => {
							postCreateAccount(values).then(response => {
								setSubmitting(false);
								if (response) {
									if (!response.data.id) {
										console.log("error");
										return;
									}
									try {
										router.push(`/player/${response.data.id}`);
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
							name="password"
							placeholder="Password"
							type="password"
							required
						/>
						<ErrorMessage component="a" className="mb-2 text-red-400" name="password" />
						<Field
							className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name="bitcoin_address"
							placeholder="Your Bitcoin payout address"
						/>
						<button
							type="submit"
							className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center"
						>
							Create Account
						</button>
					</Form>
				</Formik>
			</div>
		</>
	);
};

export default Registration;
