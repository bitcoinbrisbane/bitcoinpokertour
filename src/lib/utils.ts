import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INewEvent, IRegisterEvent } from "@/types";
import axios from "axios";
import moment from "moment";

import dotenv from "dotenv";
dotenv.config();

const API = process.env.API || "http://localhost:5000"; // || "https://api.bitcoinpokertour.com"; //

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		console.log(data[0].date, "date");
		return data[0].date;
	} catch (error) {
		//throw new Error("Failed to fetch the date from the API. Please check the network connection and the URL.");
		return "00";
	}
};

export const getEvents = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch event data from the API. Please check the network connection and the URL.");
		console.error(error);
	}
};

export const getPastEvents = async (max: number = 10) => {
	try {
		const { data } = await axios.get(`${API}/schedule/past?max=${max}`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch event data from the API. Please check the network connection and the URL.");
		console.error(error);
	}
};

export const getEventById = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event data. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const createEvent = async (event: INewEvent) => {
	const { title, description, location, date, registration_close, game_type, buy_in, fee, start_stack, blind_levels, password } = event;
	const data = {
		title,
		description,
		location,
		date,
		registration_close,
		game_type,
		buy_in,
		fee,
		start_stack,
		blind_levels
	};
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
				"x-api-key": password
			}
		};

		return await axios.post(`${API}/schedule`, data, config);
	} catch (error) {
		console.error(error);
	}
};

export const postRegistration = async (register: IRegisterEvent) => {
	const { evt_id, name, email, bitcoin_address } = register;
	const registration = {
		name: name.trim(),
		email: email.toLowerCase().trim(),
		bitcoin_address
	};
	const { id }: any = evt_id;
	try {
		return await axios.post(`${API}/registration/${id}`, registration);
	} catch (error) {
		//throw new Error("Failed to sent the event registrations. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const getRegistrations = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/registration/${id}`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event registrations. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const getEventStats = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}/stats`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event stats. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const getResults = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}/results`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event results. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const getFormattedDate = (date: any) => {
	const momentDate = moment.parseZone(date);
	const formatted = momentDate.format("L LT");
	return formatted ? formatted : "Invalid Date";
};

export const validateEmail = (value: string) => {
	let error;
	if (!value) {
		error = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		error = "Invalid email address";
	}
	return error;
};

export const validateBitcoinAddress = (value: string) => {
	if (!value) {
		return "Required";
	}

	const bitcoinAddressRegex = /\b(?:bc1([ac-hj-np-z02-9]{8,87})|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b/;
	if (bitcoinAddressRegex.test(value) === false) {
		return "Invalid Bitcoin address";
	}

	return;
};
