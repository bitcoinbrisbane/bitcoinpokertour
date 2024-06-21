"use client";
import {  Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { sendRegistration } from "@/lib/utils";
import { IRegisterEvent } from "@/types";


const Forms = (id: any) => {

    const initVals: IRegisterEvent = {
        evt_id: id,
        name: "",
        email: "",
        bitcoin_address: ""
    };

    return (
        <>
            <div className="sm:w-full md:w-2/4 p-6">
                <Formik
                    initialValues={initVals}
                    onSubmit={(
                        values: IRegisterEvent,
                        { setSubmitting }: FormikHelpers<IRegisterEvent>
                      ) => {
                        setTimeout(() => {
                            sendRegistration(values)
                            setSubmitting(false);
                          }, 500);
                      }}
                >
                    <Form className="max-w-sm mx-auto space-y-5">
                        <Field
                            className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='name'
                            placeholder="Name or BNS"
                            required
                        />
                        <ErrorMessage component='a' className="" name='name' />
                        <Field 
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id='email'
                            name='email'
                            placeholder="Email"
                            validate={validateEmail}
                            required
                        />
                        <ErrorMessage component='a' className="mb-2 text-red-400" name='email' />
                        <Field
                            className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='bitcoin_address'
                            placeholder="BTC receive address"
                            required
                        />
                        <ErrorMessage component='a' className="" name='bitcoin_address'/>
                        <button type="submit"  className="shadow-md w-full font-bold hover:cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg border text-sm px-5 py-2.5 text-center">Register</button>
                    </Form>

                </Formik>
            </div>

        </>
    )
}


function validateEmail(value: string) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

export default Forms;
