import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IRegisterEvent } from "@/types";
import axios from "axios";

const API =  process.env.API || "https://api.bitcoinpokertour.com" // "http://localhost:5001";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		console.log(data[0].date, 'date')
		return data[0].date;
	} catch (error) {
		//throw new Error("Failed to fetch the date from the API. Please check the network connection and the URL.");
		return "00"
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

export const getEventById = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event data. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};

export const postRegistration = async (register: IRegisterEvent) => {
	const { evt_id, name, email, bitcoin_address } = register;
	const registration = {
		name,
		email,
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

export const getEventStats = async(id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}/stats`);
		return data;
	} catch (error) {
		//throw new Error("Failed to fetch the event stats. Please check the event ID, network connection, and the URL.");
		console.error(error);
	}
};
