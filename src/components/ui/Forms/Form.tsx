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
            <div className="sm:w-full md:w-2/4  shadow-lg border rounded-lg p-6">
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
                        <label className="py-1" aria-label="disabled input mt-2" htmlFor='Name'>
                            Name or bns:
                        </label>
                        <ErrorMessage component='a' className="" name='name' />
                        <Field
                            className="bg-gray-50 border border-gray-300 text-gray-900 mb-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='name'
                            placeholder="John Doe"
                            required
                        />
                        <label className="py-1" htmlFor='Email'>
                            Email:
                        </label>
                        <ErrorMessage component='a' className="mb-2 text-red-400" name='email' />
                        <Field 
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id='email'
                            name='email'
                            placeholder="john@doe.com"
                            validate={validateEmail}
                            required
                        />
                        
                        <label className="py-1 mt-2" aria-label="disabled input" htmlFor='bitcoin_address'>
                            Bitcoin Address:
                        </label>
                        <ErrorMessage component='a' className="" name='bitcoin_address' />
                        <Field
                            className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name='bitcoin_address'
                            placeholder="tb1qugnsszut6dm6ggj8ut45tg83tklfcsqwv4l39q"
                            required
                        />
                        <button type="submit"  className="shadow-md hover:cursor-pointer hover:bg-blue-500 hover:text-white font-medium rounded-lg border text-sm px-5 py-2.5 text-center">Register</button>
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