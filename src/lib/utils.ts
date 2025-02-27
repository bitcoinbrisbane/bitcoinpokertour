import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { INewEvent, IRegisterEvent } from "@/types";
import axios from "axios";
import moment from "moment";

import dotenv from "dotenv";
dotenv.config();

// Use the environment variable instead
const API = process.env.NEXT_PUBLIC_API || 'http://localhost:5001';

// Helper function to get headers
const getHeaders = () => {
	return {
		'ngrok-skip-browser-warning': 'true'
	};
};

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
		console.error('Error fetching past events:', error);
		return null;
	}
};

export const getEventById = async (id: string) => {
	try {
		const response = await axios.get(
			`${API}/schedule/${id}`,
			{ headers: getHeaders() }
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching event:', error);
		return null;
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

export const postRegistration = async (values: IRegisterEvent) => {
	try {
		console.log('Sending registration data:', values);
		const response = await axios.post(
			`${API}/registration/${values.evt_id}`,
			{
				name: values.name,
				email: values.email,
				bitcoin_address: values.bitcoin_address,
				event_id: values.evt_id
			},
			{ headers: getHeaders() }
		);
		return response;
	} catch (error) {
		console.log('Registration request details:', {
			url: `${API}/registration/${values.evt_id}`,
			data: values
		});
		throw error;
	}
};

export const getRegistrations = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/registration/${id}`);
		return data;
	} catch (error) {
		console.error('Error fetching registrations:', error);
		return null;
	}
};

export const getEventStats = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}/stats`);
		return data;
	} catch (error) {
		console.error('Error fetching event stats:', error);
		return null;
	}
};

export const getResults = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}/results`);
		return data;
	} catch (error) {
		console.error('Error fetching results:', error);
		return null;
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

export const getEventRegistrationCount = async (eventId: string) => {
	try {
		console.log('Fetching registration count for event:', eventId);
		console.log('API URL:', `${API}/schedule/${eventId}/registrations/count`);

		const response = await axios.get(
			`${API}/schedule/${eventId}/registrations/count`,
			{ headers: getHeaders() }
		);
		console.log('Registration count response:', response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching registration count:", error);
		console.error("Full error details:", {
			message: (error as any).message,
			response: (error as any).response?.data,
			status: (error as any).response?.status
		});
		return null;
	}
};
