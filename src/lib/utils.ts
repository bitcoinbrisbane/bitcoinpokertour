import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INewEvent, IRegisterEvent } from "@/types";
import axios from "axios";
import moment from "moment";

import dotenv from "dotenv";
dotenv.config();

export const API = 'http://localhost:5001';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		console.log('All events:', data);

		if (!data || data.length === 0) {
			console.log('No events found');
			return moment().add(1, 'months').format();
		}

		// Filter out past events and sort by date
		const upcomingEvents = data
			.filter((event: any) => {
				const eventDate = moment(event.date);
				return eventDate.isAfter(moment());
			})
			.sort((a: any, b: any) => {
				return moment(a.date).valueOf() - moment(b.date).valueOf();
			});

		console.log('Next upcoming event:', upcomingEvents[0]);

		if (upcomingEvents.length === 0) {
			console.log('No upcoming events found');
			return moment().add(1, 'months').format();
		}

		return upcomingEvents[0].date;
	} catch (error) {
		console.error('Error fetching date:', error);
		return moment().add(1, 'months').format();
	}
};

export const getEvents = async () => {
	try {
		console.log('Attempting to fetch from:', `${API}/schedule`);
		const { data } = await axios.get(`${API}/schedule`);
		return data;
	} catch (error) {
		console.error('Error fetching events:', error);
		console.error('API URL being used:', API);
		return null;
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
	console.log(event, "event");
	
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
