import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import axios from "axios";
import { IDates } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getDate = async () => {
	try {
		const {data} = await axios.get("https://plankton-app-lht9q.ondigitalocean.app/schedule");
		return data[0].date;
	} catch (error) {
		throw new Error("Failed to fetch the date from the API. Please check the network connection and the URL.");
	}
};

export const getEvents = async () => {
	try {
		const {data} = await axios.get("https://plankton-app-lht9q.ondigitalocean.app/schedule");
		return data;
	} catch (error) {
		throw new Error("Failed to fetch event data from the API. Please check the network connection and the URL.");
	}
};

export const getEventById = async (id: string) => {
	try {
		const {data} = await axios.get(`https://plankton-app-lht9q.ondigitalocean.app/schedule/${id}`);
		return data
	} catch (error) {
		throw new Error("Failed to fetch the event data. Please check the event ID, network connection, and the URL.");
	}
};
