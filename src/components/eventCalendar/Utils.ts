import { setHours } from "date-fns-jalali";
import { CalendarEvent } from "./types";

export const defaultStartHour = 8;
export const defaultEndHour = 20;

export const setEventToFullDay = (event: CalendarEvent) => {
    const { start, end } = event;
    return {
        ...event,
        start: new Date(start.getFullYear(), start.getMonth(), start.getDate(), defaultStartHour, 0, 0),
        end: new Date(start.getFullYear(), start.getMonth(), start.getDate(), defaultEndHour, 0, 0)
    }
}