import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getDate = async () => {
  try {
    const res = await axios.get('https://plankton-app-lht9q.ondigitalocean.app/schedule')
    const {date} = res.data[0]
    return date
  } catch (error) {
    throw new Error('Cannot Catch the date')
  } 
}