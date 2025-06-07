import moment from 'moment-timezone';

// Brisbane timezone constant
export const BRISBANE_TIMEZONE = 'Australia/Brisbane';

// Convert any date to Brisbane timezone
export const toBrisbaneTime = (date: string | Date): moment.Moment => {
  return moment(date).tz(BRISBANE_TIMEZONE);
};

// Format date in Brisbane timezone for display
export const formatBrisbaneDate = (date: string | Date, format: string = 'MMM D, YYYY h:mm A'): string => {
  return toBrisbaneTime(date).format(format);
};

// Convert Brisbane time to UTC for storage
export const brisbaneToUTC = (dateString: string): Date => {
  // Assume the input date string is in Brisbane timezone
  return moment.tz(dateString, BRISBANE_TIMEZONE).utc().toDate();
};

// Get current Brisbane time
export const nowInBrisbane = (): moment.Moment => {
  return moment().tz(BRISBANE_TIMEZONE);
};

// Format for datetime-local input (Brisbane time)
export const formatForDateTimeInput = (date?: string | Date): string => {
  const brisbaneTime = date ? toBrisbaneTime(date) : nowInBrisbane();
  return brisbaneTime.format('YYYY-MM-DDTHH:mm');
};

// Convert datetime-local input to UTC Date for API
export const dateTimeInputToUTC = (dateTimeLocalString: string): Date => {
  // The input is assumed to be in Brisbane time
  return moment.tz(dateTimeLocalString, BRISBANE_TIMEZONE).utc().toDate();
};

// Convert datetime-local input to UTC ISO string for API
export const dateTimeInputToUTCString = (dateTimeLocalString: string): string => {
  // The input is assumed to be in Brisbane time
  return moment.tz(dateTimeLocalString, BRISBANE_TIMEZONE).utc().toISOString();
}; 