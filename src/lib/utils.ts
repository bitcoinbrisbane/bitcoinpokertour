import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IRegisterEvent } from "@/types";
import axios from "axios";

const API = "http://localhost:5001"; // process.env.API || "https://api.bitcoinpokertour.com";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		return data[0].date;
	} catch (error) {
		throw new Error("Failed to fetch the date from the API. Please check the network connection and the URL.");
	}
};

export const getEvents = async () => {
	try {
		const { data } = await axios.get(`${API}/schedule`);
		return data;
	} catch (error) {
		throw new Error("Failed to fetch event data from the API. Please check the network connection and the URL.");
	}
};

export const getEventById = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/schedule/${id}`);
		return data;
	} catch (error) {
		throw new Error("Failed to fetch the event data. Please check the event ID, network connection, and the URL.");
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
		const res = await axios.post(`${API}/registration/${id}`, registration);
		console.log(res);
	} catch (error) {
		throw new Error("Failed to sent the event registrations. Please check the event ID, network connection, and the URL.");
	}
};

export const getRegistrations = async (id: string) => {
	try {
		const { data } = await axios.get(`${API}/registration/${id}`);
		return data;
	} catch (error) {
		throw new Error("Failed to fetch the event registrations. Please check the event ID, network connection, and the URL.");
	}
};
