import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const res = await axios.get("https://plankton-app-lht9q.ondigitalocean.app/schedule");
		return res.data[0].date;
	} catch (error) {
		throw new Error("Cannot Catch the date");
	}
};

export const getEvents = async () => {
	try {
		const res = await axios.get("https://plankton-app-lht9q.ondigitalocean.app/schedule");
		return res.data;
	} catch (error) {
		throw new Error("Failed to fetch event data from the API. Please check the network connection and the URL.");
	}
};

export const getEventById = async (id: string) => {
	try {
		const res = await axios.get(`https://plankton-app-lht9q.ondigitalocean.app/schedule/event/${id}/results`);
		return res.data;
	} catch (error) {
		throw new Error("This event does not exist");
	}
}
